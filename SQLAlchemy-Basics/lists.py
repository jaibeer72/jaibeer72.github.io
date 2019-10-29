import os 

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(os.getenv("Database_Url"))
db = scoped_session(sessionmaker(bind=engine))

def main():
    flights = db.execute("SELECT origin, destination , duration FROM flights").fetchall()
    for flight in flights:
        print(f"{flight.origin} to {flight.destination} takes {flight.duration}")



if __name__ == "__main__":
    main()

# I am still haveing problems createing DB's 
# But i am working on it.
