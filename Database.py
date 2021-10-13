import mysql.connector
import os
from datetime import datetime

db = mysql.connector.connect(
    host='localhost',
    user= os.getenv('user'),
    passwd= os.getenv('passwd'),
    database= os.getenv('database')
)


#ONLY CALL THIS WHEN CREATING A NEW DATABASE
def initDB():
    db = mysql.connector.connect(
        host='localhost',
        user= os.getenv('user'),
        passwd= os.getenv('passwd')
    )

    mycursor = db.cursor()
    mycursor.execute('CREATE DATABASE %s' % os.getenv('database'))

    db = mysql.connector.connect(
    host='localhost',
    user= os.getenv('user'),
    passwd= os.getenv('passwd'),
    database= os.getenv('database')
    )

    mycursor = db.cursor()
    Q1 = mycursor.execute('CREATE TABLE Users (name VARCHAR(50), balance int UNSIGNED, dateCreated date, discordUID VARCHAR(50) PRIMARY KEY)')
    Q2 = mycursor.execute('''CREATE TABLE Wagers (wagerId int AUTO_INCREMENT,dUID VARCHAR(50),fightTitle VARCHAR(50),fighterChoice VARCHAR(50),link VARCHAR(100),wager int UNSIGNED,odds smallint,wagerDate date,fightDate VARCHAR(12),fighterColor VARCHAR(5),payout int UNSIGNED,PRIMARY KEY (wagerId),FOREIGN KEY(dUID) REFERENCES Users(discordUID))''')
    Q3 = mycursor.execute('''CREATE TABLE WagerHistory (wagerId int AUTO_INCREMENT,dUID VARCHAR(50),fightTitle VARCHAR(50),fighterChoice VARCHAR(50),link VARCHAR(100),wager int UNSIGNED,odds smallint,wagerDate date,fightDate VARCHAR(12),fighterColor VARCHAR(5),payout int UNSIGNED,outcome VARCHAR(6),PRIMARY KEY (wagerId),FOREIGN KEY(dUID) REFERENCES Users(discordUID))''')
    mycursor.execute(Q1)
    mycursor.execute(Q2)

    db.commit()



'''USER FUNCTIONS'''
def addNewUser(name,dUID,balance=500):
    global db
    db.cursor().execute('INSERT INTO Users (name,balance,dateCreated,discordUID) VALUES (%s,%s,%s,%s)', (name,balance,datetime.now(),dUID))
    db.commit()

def removeUser(dUID):
   global db
   db.cursor().execute('DELETE FROM Users WHERE discordUID = %s' % dUID)  
   db.commit()  

def getUserBalance(dUID):
    global db
    cursor = db.cursor()
    cursor.execute('SELECT balance FROM Users WHERE discordUID = %s' % dUID)
    return cursor.fetchone()[0]

def updateUserBalance(dUID, balanceChange):
    global db
    newBalance = getUserBalance(dUID) + balanceChange
    db.cursor().execute('UPDATE Users SET balance = %s WHERE discordUID = %s' % (newBalance, dUID))
    db.commit()

def setUserBalance(dUID, balance):
    global db
    db.cursor().execute('UPDATE Users SET balance = %s WHERE discordUID = %s' % (balance, dUID))
    db.commit()

def getUserByDiscordUID(dUID):  #returns dictionary of row with discord uid
    global db
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Users WHERE discordUID = %s' % dUID)
    return cursor.fetchone()


'''WAGER FUNCTIONS'''
#places a wager
def placeWager(dUID, fightTitle, fighterChoice,link,wager,odds,fightDate,fighterColor,payout):
    global db
    db.cursor().execute('INSERT INTO Wagers (dUID,fightTitle,fighterChoice,link,wager,odds,wagerDate,fightDate,fighterColor,payout) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)', (dUID,fightTitle,fighterChoice,link,wager,odds,datetime.now(), fightDate,fighterColor,payout))
    db.commit()

#returns all wagers made by a single user
def getWagersByDUID(dUID):
    global db
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Wagers WHERE dUID = %s' % dUID)
    return cursor.fetchall()

#returns all wagers made by a single user
def getWagersByFightDate(fDate):
    global db
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Wagers WHERE fightDate = \'%s\'' % fDate)
    return cursor.fetchall()

#returns a single wager by the wagerId
def getWagerByWagerID(wID):
    global db
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Wagers WHERE wagerId = %s' % wID)
    return cursor.fetchone()

#returns all bets on a specific fight
def getWagersByFightTitle(fightTitle):
    global db
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Wagers WHERE fightTitle = %s' % fightTitle)
    return cursor.fetchall()

#remove all bets on a specific fight
def removeWagersByFightTitle(fightTitle):
    global db
    db.cursor().execute('DELETE FROM Wagers WHERE fightTitle = %s' % fightTitle)  
    db.commit()  
    return '[Database]: removed all wagers %s by dUID' % fightTitle

#removes a single bet by the wagerId
def removeWagerByID(wagerID):
    global db
    db.cursor().execute('DELETE FROM Wagers WHERE wagerId = %s' % wagerID)
    db.commit()
    return '[Database]: removed wager %s by wagerId' % wagerID

#removes all bets a user has placed
def removeWagersByDUID(dUID):
    global db
    db.cursor().execute('DELETE FROM Wagers WHERE dUID = %s' % dUID)  
    db.commit()  
    return '[Database]: removed all wagers %s by dUID' % dUID

def moveWagerToHistoryByID(wagerId,outcome):
    global db
    db.cursor().execute('INSERT INTO wagerhistory (wagerId, dUID, fightTitle, fighterChoice, link, wager, odds, wagerDate, fightDate, fighterColor, payout) SELECT * FROM wagers WHERE wagerId = %s' % wagerId) 
    db.cursor().execute('DELETE FROM wagers WHERE wagerId = %s' % wagerId)
    db.cursor().execute('UPDATE wagerhistory SET outcome = \'%s\' WHERE wagerId = %s' % (outcome, wagerId))
    db.commit()  
#addNewUser('TEST','')
#for i in getUserByDiscordUID(''):
#   print(i)

#placeWager('', 'Blachowicz vs Teixeira', 'Blue', 'https://www.ufc.com/event/ufc-267', 100, 120)
#placeWager('', 'Usman vs Covington', 'Red', 'https://www.ufc.com/event/ufc-268', 300, -120)
#print(getWagerByWagerID(6))
#updateUserBalance('',-200)
#print(getUserByDiscordUID(''))
#initDB()
#addNewUser('TEST','')










#mycursor.execute('CREATE DATABASE BetBotDB')
#Q1 = mycursor.execute('CREATE TABLE Users (name VARCHAR(50), balance int UNSIGNED, dateCreated date, id int PRIMARY KEY AUTO_INCREMENT)')
#Q2 = mycursor.execute('''CREATE TABLE Wagers (wagerId int AUTO_INCREMENT,userId int,fightTitle VARCHAR(50),fighterChoice VARCHAR(50),link VARCHAR(100),wager int UNSIGNED,odds smallint,wagerDate date,PRIMARY KEY (wagerId),FOREIGN KEY(userId) REFERENCES Users(id))''')

#mycursor.execute(Q1)
#mycursor.execute(Q2)
#mycursor.execute('CREATE TABLE Person (name VARCHAR(50), age smallint UNSIGNED, personID int PRIMARY KEY AUTO_INCREMENT)')
#mycursor.execute('INSERT INTO Person (name, age) VALUES (%s,%s)', ('poggie',21))
#db.commit()
#mycursor.execute('SELECT * FROM Person')

