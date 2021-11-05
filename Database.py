import mysql.connector
import os
from datetime import datetime

class DataBase:
    def __init__(self):
        self.db = mysql.connector.connect(
            host='localhost',
            user= os.getenv('user'),
            passwd= os.getenv('passwd'),
            database= os.getenv('database')
        )
        self.cursor = self.db.cursor()
    
    def getDB(self):
        self.db = mysql.connector.connect(
            host='localhost',
            user= os.getenv('user'),
            passwd= os.getenv('passwd'),
            database= os.getenv('database')
        )

    def setupCursor(self, isDict=False):
        self.cursor.close() #close existing cursor
        self.cursor = self.db.cursor(dictionary=isDict)
        self.cursor.execute("SET SESSION MAX_EXECUTION_TIME=1000")

    '''USER FUNCTIONS'''
    def addNewUser(self,name,dUID,serverName, serverID,balance=500):
        self.setupCursor()
        self.cursor.execute('INSERT INTO Users (name,balance,dateCreated,discordUID) VALUES (%s,%s,%s,%s)', (name,balance,datetime.now(),dUID))
        self.cursor.execute('INSERT INTO serverlist (dUID, serverName, serverID) VALUES (%s,%s, %s)', (dUID,serverName,serverID))
        self.db.commit()

    def addNewServerForUser(self,dUID, serverName, serverID):
        self.setupCursor()
        self.cursor.execute('INSERT INTO serverlist (dUID, serverName, serverID) VALUES (%s,%s, %s)', (dUID,serverName,serverID))
        self.db.commit()

    def removeUser(self,dUID):
        self.setupCursor()
        self.cursor.execute('DELETE FROM Users WHERE discordUID = %s' % dUID)  
        self.db.commit()  

    def getUserBalance(self,dUID):
        self.setupCursor()
        self.cursor.execute('SELECT balance FROM Users WHERE discordUID = %s' % dUID)
        print(self.cursor)
        return self.cursor.fetchone()[0]

    def updateUserBalance(self,dUID, balanceChange):
        self.setupCursor()
        newBalance = self.getUserBalance(dUID) + balanceChange
        self.cursor.execute('UPDATE Users SET balance = %s WHERE discordUID = %s' % (newBalance, dUID))
        self.db.commit()

    def setUserBalance(self,dUID, balance):
        self.setupCursor()
        self.cursor.execute('UPDATE Users SET balance = %s WHERE discordUID = %s' % (balance, dUID))
        self.db.commit()

    def getUserByDiscordUID(self,dUID):  #returns dictionary of row with discord uid
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM Users WHERE discordUID = %s' % dUID)
        return self.cursor.fetchone()

    def isUserInServer(self,dUID, serverID):
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM serverlist WHERE dUID = %s HAVING serverID =%s' % (dUID, serverID))
        return bool(self.cursor.fetchone())    #if it returns empty then false, user is not in that server

    '''WAGER FUNCTIONS'''
    #places a wager
    def placeWager(self,dUID, fightTitle, fighterChoice,link,wager,odds,fightDate,fighterColor,payout):
        self.setupCursor()
        self.cursor.execute('INSERT INTO Wagers (dUID,fightTitle,fighterChoice,link,wager,odds,wagerDate,fightDate,fighterColor,payout) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)', (dUID,fightTitle,fighterChoice,link,wager,odds,datetime.now(), fightDate,fighterColor,payout))
        self.db.commit()

    #returns all wagers made by a single user
    def getWagersByDUID(self,dUID):
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM Wagers WHERE dUID = %s' % dUID)
        return self.cursor.fetchall()

    #returns all wagers made by a single user
    def getWagersByFightDate(self,fDate):
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM Wagers WHERE fightDate = \'%s\'' % fDate)
        return self.cursor.fetchall()

    #returns a single wager by the wagerId
    def getWagerByWagerID(self,wID):
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM Wagers WHERE wagerId = %s' % wID)
        return self.cursor.fetchone()

    def getActiveWagers(self):
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM Wagers')
        return self.cursor.fetchall()

    #returns all bets on a specific fight
    def getWagersByFightTitle(self,fightTitle):
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM Wagers WHERE fightTitle = %s' % fightTitle)
        return self.cursor.fetchall()

    #remove all bets on a specific fight
    def removeWagersByFightTitle(self,fightTitle):
        self.setupCursor()
        self.cursor.execute('DELETE FROM Wagers WHERE fightTitle = %s' % fightTitle)  
        self.db.commit()  
        return '[Database]: removed all wagers %s by dUID' % fightTitle

    #removes a single bet by the wagerId
    def removeWagerByID(self,wagerID):
        self.setupCursor()
        self.cursor.execute('DELETE FROM Wagers WHERE wagerId = %s' % wagerID)
        self.db.commit()
        return '[Database]: removed wager %s by wagerId' % wagerID

    #removes all bets a user has placed
    def removeWagersByDUID(self,dUID):
        self.setupCursor()
        self.cursor.execute('DELETE FROM Wagers WHERE dUID = %s' % dUID)  
        self.db.commit()  
        return '[Database]: removed all wagers %s by dUID' % dUID

    def moveWagerToHistoryByID(self,wagerId,outcome):
        self.setupCursor()
        self.cursor.execute('INSERT INTO wagerhistory (wagerId, dUID, fightTitle, fighterChoice, link, wager, odds, wagerDate, fightDate, fighterColor, payout) SELECT * FROM wagers WHERE wagerId = %s' % wagerId) 
        self.cursor.execute('DELETE FROM wagers WHERE wagerId = %s' % wagerId)
        self.cursor.execute('UPDATE wagerhistory SET outcome = \'%s\' WHERE wagerId = %s' % (outcome, wagerId))
        self.db.commit()  

    def getWagerHistoryByDUID(self,dUID):
        self.setupCursor(True)
        self.cursor.execute('SELECT * FROM wagerhistory WHERE dUID = %s' % dUID)
        return self.cursor.fetchall()

    def getLastWagersByDUID(self,dUID,amount=5):
        self.setupCursor(True)
        self.cursor.execute('SELECT * from wagerhistory WHERE dUID = %s order by wagerId desc limit %s' % (dUID,amount))
        return self.cursor.fetchall()

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
    Q4 = mycursor.execute('CREATE TABLE serverlist (dUID VARCHAR(50),serverName VARCHAR(50),serverID VARCHAR(50), FOREIGN KEY(dUID) REFERENCES Users(discordUID))')
    mycursor.execute(Q1)
    mycursor.execute(Q2)

    db.commit()
