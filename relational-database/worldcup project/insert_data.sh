#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  if [[ $YEAR != "year" ]]
  then
    TEAM_1=$($PSQL "INSERT INTO teams (name)
            (
              SELECT '$WINNER'
              WHERE NOT EXISTS (
                SELECT 1
                  FROM teams 
                  WHERE name = '$WINNER')
              )")
    # if [[ $TEAM_1 == "INSERT 0 1" ]]
    # then
    #   echo "Inserted $WINNER into teams."
    # fi

    TEAM_2=$($PSQL "INSERT INTO teams (name)
        (
          SELECT '$OPPONENT'
          WHERE NOT EXISTS (
            SELECT 1
              FROM teams 
              WHERE name = '$OPPONENT')
          )")    
    # if [[ $TEAM_2 == "INSERT 0 1" ]]
    #   then
    #     echo "Inserted $OPPONENT into teams."
    #   fi  

    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT'")
    MATCH=$($PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals)
                              VALUES ($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)")
  fi
done
