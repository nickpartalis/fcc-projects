#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# Fetching User Data
echo "Enter your username:"
read USERNAME

USER_QUERY_RESULT=$($PSQL "SELECT games_played, best_game FROM users WHERE username = '$USERNAME'")
if [[ -z $USER_QUERY_RESULT ]]
then
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  NEW_USER=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
  GAMES_PLAYED=0
  BEST_GAME=0
else
  IFS="|" read GAMES_PLAYED BEST_GAME <<< $USER_QUERY_RESULT
  echo -e "\nWelcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

# Number Guessing Game
SECRET_NUMBER=$(( $RANDOM % 1000 + 1 ))
GUESS=0
TRIES=0
echo -e "\nGuess the secret number between 1 and 1000:"
while [[ ! $GUESS -eq $SECRET_NUMBER ]]
do
  read GUESS
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
  else

    TRIES=$(( $TRIES + 1 ))
    if [[ $GUESS -gt $SECRET_NUMBER ]]
    then
      echo "It's lower than that, guess again:"
    elif [[ $GUESS -lt $SECRET_NUMBER ]]
    then
      echo "It's higher than that, guess again:"
    else
      echo "You guessed it in $TRIES tries. The secret number was $SECRET_NUMBER. Nice job!"
      GAMES_PLAYED=$(( $GAMES_PLAYED + 1 ))
      if [[ $BEST_GAME -eq 0 ]]
      then
        BEST_GAME=$TRIES
      elif [[ $TRIES -lt $BEST_GAME ]]
      then
        BEST_GAME=$TRIES
      fi
      DATA_SAVED=$($PSQL "UPDATE users SET games_played=$GAMES_PLAYED, best_game=$BEST_GAME WHERE username='$USERNAME'")
    fi
  fi
done
