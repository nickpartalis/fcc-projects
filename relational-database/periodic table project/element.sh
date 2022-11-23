#!/bin/bash
PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

if [[ -z $1 ]]
then
  echo "Please provide an element as an argument."
else
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    QUERY_RESULT=$($PSQL "SELECT * FROM elements WHERE atomic_number = $1")
  else
    QUERY_RESULT=$($PSQL "SELECT * FROM elements WHERE symbol = INITCAP('$1') OR name = INITCAP('$1')")
  fi
  
  if [[ -z $QUERY_RESULT ]]
  then
    echo "I could not find that element in the database."
  else
    echo $QUERY_RESULT | sed 's/  */ /g' | { read ATOMIC_NUM BAR SYMBOL BAR NAME;
      PROPERTIES_QUERY_RESULT=$($PSQL "SELECT type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM properties LEFT JOIN types USING(type_id) WHERE atomic_number=$ATOMIC_NUM");
      echo $PROPERTIES_QUERY_RESULT | { read TYPE BAR MASS BAR MELTING BAR BOILING;
        echo "The element with atomic number $ATOMIC_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."; }
    }
  fi
fi