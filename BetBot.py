from discord import Client,Embed, Color, File
from discord.ext.commands.core import check
from discord.ext import tasks
from discord_components import Button, Select, SelectOption, ComponentsBot
import requests #for api requests
import os
import Database
import locale
from datetime import date, datetime
locale.setlocale(locale.LC_ALL, 'en_US')
bot = ComponentsBot(">")
"""
or you can just override the methods yourself

bot = discord.ext.commands.Bot("!")
DiscordComponents(bot)
"""
testing = True
apiBaseURL = 'http://localhost:3000'


def monthAbreviationToNumber(abr):
  months = ['ja','f','mar','ap','may','jun','jul','au','s','o','n','d']
  for i in range(12):
    if abr.lower().startswith(months[i]):
      return i+1
  print('ERROR: DATE NOT DETECTED')

'''VERIFICATION'''
async def verificationChecks(response, choice, wager=0):
  if testing:
    return ''
  if response['fights'][choice]['Red']['Odds']=='-' and response['fights'][choice]['Blue']['Odds']=='-':
    return 'These fighters do not have odds yet, check back later to place bests.'
  elif response['fights'][choice]['Red']['Outcome'] != '' or response['fights'][choice]['Blue']['Outcome']=='':
    return 'This fight has already happened you cannot bet on it.'
  elif await isFightLive(response,choice):
    return 'This fight is currently live, it is too late to bet'
  elif await isFightCompleted(choice):
    return 'This fight has already been completed, it is too late to bet'
  #elif wager> await userBankAccount():
  #  return 'You wagered more than you own buckaroo'

async def isFightLive(response,fight):
  res = requests.get(apiBaseURL + "/api/v1/liveEventStatus?url=" + response['url']).json()
  return res[fight]

async def isFightCompleted(choice):
  res = await getUpcomingFights()
  if not res['fights'][choice]['Red']['Outcome'] and not res['fights'][choice]['Red']['Outcome']:
    return False
  else:
    return True

'''HELPER FUNCTIONS'''
def logUserActions(ctx, action, display=True):
  if display:
    print(ctx.message.author.name + '#' + ctx.message.author.discriminator + action)

def ufcDateFormatter(ufcDate):
  ufcDate = ufcDate.split(',')[1].split('/')[0].strip().split(' ')
  #newDate = str(datetime.now().year) + '-' + str(monthAbreviationToNumber(ufcDate[0])) + '-' + ufcDate[1]
  newDate = str(monthAbreviationToNumber(ufcDate[0])) + '-' + ufcDate[1]
  return newDate

def listToSelectOptions(list):
    selectList = []
    count = 1
    for i in list:
        selectList.append(
            SelectOption(label= str(count) + '. '+ i, value=i)
        )
        count+=1
    return selectList

def chooseFighter(choice, response):
  embed = Embed(title='Who would you like to bet on?').add_field(
    name='__' + response['fights'][choice]['Red']['Name'] + '__', value=response['fights'][choice]['Red']['Odds'], inline=True).add_field(
    name='__' + response['fights'][choice]['Blue']['Name'] + '__', value=response['fights'][choice]['Blue']['Odds'], inline=True).set_footer(text='select a button or click cancel')

  return embed

def calculatePayout(initialBet, odds):
  if odds == '-':   #check if odds are not up yet
    return None

  if '+' == odds[0]:  #if underdog
    return (initialBet/100) * int(odds[1:]) + initialBet
  elif '-' == odds[0]:  #if favorite
    return (initialBet/int(odds[1:])) * 100 + initialBet

async def editInteractionMessage(interaction, contentObj):  #contentObj needs to be passed in like: {'content' : 'your text here'} or like: {'embed': embedObj}
  appId = os.getenv('APPID')
  token = interaction.interaction_token
  requests.patch(f'https://discord.com/api/v8/webhooks/{appId}/{token}/messages/@original',contentObj)

async def deleteInteractionMessage(interaction):
  appId = os.getenv('APPID')
  token = interaction.interaction_token
  requests.patch(f'https://discord.com/api/v8/webhooks/{appId}/{token}/messages/@original',{'method':'DELETE'})

'''GET API INFO AND DISPLAY IT'''
#embedAllFights(api response): Returns a discord Embed list of one or 2 embeds to be displayed
def embedAllFights(response):
  embedList = []
  fightList = getFightTitleList(response)  
  embed =Embed(title = response['eventTitle'],
  url = response['url'],
  description = response['date'],
  color = Color.green()
  ).set_thumbnail(
        url=response['image']
  ).set_author(
        name='BetBot',url='https://python.plainenglish.io/python-discord-bots-formatting-text-efca0c5dc64a',icon_url = 'https://cdn.discordapp.com/avatars/895536293356924979/fc5defd0df0442bd4a2326e552c11899.png?size=32'
  )

  if len(fightList)>8:
    embed2 = Embed(color = Color.green()).set_footer(text='Page 2')

  for index in range(0,len(fightList)):
    #embed = embed.add_field(name='**' + fightList[index] + '**', value='\u200B', inline=False)
    if index > 7:
      embed2 = embed2.add_field(name='**' + str(index+1) + '**', value='\u200B', inline=True)
      embed2 = embed2.add_field(name='__' + response['fights'][fightList[index]]['Red']['Name'] + '__', value=response['fights'][fightList[index]]['Red']['Odds'], inline=True) 
      embed2 = embed2.add_field(name='__' + response['fights'][fightList[index]]['Blue']['Name'] + '__', value=response['fights'][fightList[index]]['Blue']['Odds'], inline=True) 
    else:
      embed = embed.add_field(name='**' + str(index+1) + '**', value='\u200B', inline=True)
      embed = embed.add_field(name='__' + response['fights'][fightList[index]]['Red']['Name'] + '__', value=response['fights'][fightList[index]]['Red']['Odds'], inline=True) 
      embed = embed.add_field(name='__' + response['fights'][fightList[index]]['Blue']['Name'] + '__', value=response['fights'][fightList[index]]['Blue']['Odds'], inline=True) 
    
  embedList.append(embed)
  if len(fightList) > 8:
    embedList.append(embed2)
    # embed = embed.add_image(https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-10/69355%252Fprofile-galery%252Ffullbodyleft-picture%252FSANTOS_THIAGO_L_10-02.png?itok=P-bmqcLV
  return embedList

#getFightTitleList(api response): returns list of all fight names i.e. ['Covington vs Usman', 'Namajunas vs Weili']
def getFightTitleList(response):
  return list(response['fights'].keys())

#returns api response from /nextEvent
async def getUpcomingFights():
  return requests.get(apiBaseURL + "/api/v1/nextEvent").json()

async def getFightByURL(url):
  return requests.get(apiBaseURL + "/api/v1/eventByLink?url=" + url).json()


'''MENU HELPERS'''
async def initBetMenu(ctx):
  tempMsg = await ctx.send(content = 'Retrieving data please wait...')
  response = await getUpcomingFights()
  await tempMsg.delete()
  embedList = embedAllFights(response)
  selOptions = listToSelectOptions(getFightTitleList(response))
  selOptions.append(SelectOption(label='🚫 Cancel', value='Cancel'))
  msg = await ctx.send(
      embeds=embedList,
      components=[
          Select(
              placeholder="Select something!",
              options= selOptions,
              custom_id="betMenu",
          )

      ],
  )
  return [response,msg]

def betbotMenuEmbed():
  embed=Embed(color = Color.green(), title="by idgnfs", url="https://www.instagram.com/idgnfs/", description="I am BetBot a discord bot that allows you to bet on upcoming UFC fights. I can keep track of your betting balance and if you go into the hole I offer ways you can make money to start your addiction of betting up again.")
  embed.set_author(name="BetBot Account Menu", icon_url = 'https://cdn.discordapp.com/avatars/895536293356924979/fc5defd0df0442bd4a2326e552c11899.png?size=32')
  embed.set_thumbnail(url="https://cdn.discordapp.com/avatars/895536293356924979/fc5defd0df0442bd4a2326e552c11899.png?size=32")
  embed.set_footer(text="click a button below")
  embed.set_thumbnail(url='https://cdn.discordapp.com/avatars/895536293356924979/fc5defd0df0442bd4a2326e552c11899.png?size=32')
  return embed

def balanceEmbed(ctx):
  #title= ctx.message.author.name + '#' + ctx.message.author.discriminator +" Balance:"
  embed=Embed(color=Color.green(), title= ctx.message.author.name + '#' + ctx.message.author.discriminator +" Balance:", description=locale.currency(Database.getUserBalance(ctx.message.author.id), grouping=True))
  embed.set_author(name="BetBot", icon_url="https://cdn.discordapp.com/avatars/895536293356924979/fc5defd0df0442bd4a2326e552c11899.png?size=32")
  return embed

def wagersEmbed(ctx,wagers):
  #title= ctx.message.author.name + '#' + ctx.message.author.discriminator +" Balance:"
  embed=Embed(color=Color.green(), title= ctx.message.author.name + '#' + ctx.message.author.discriminator +" Wagers:")
  embed.set_author(name="BetBot", icon_url="https://cdn.discordapp.com/avatars/895536293356924979/fc5defd0df0442bd4a2326e552c11899.png?size=32")
  for wager in wagers:
    if wager['odds'] > 0:
      wager['odds'] = '+' + str(wager['odds'])

    embed.add_field(name=wager['fightTitle'], value='Your Pick: ' + wager['fighterChoice'] + '\nOdds: ' + str(wager['odds']))
    embed.add_field(name='\u200B', value='Your Bet: ' + str(wager['wager']) + '\nPayout: ' + str(wager['payout']), inline=True)
    embed.add_field(name='\u200B', value='\u200B')
  return embed

'''MENUS'''
async def betMenu(ctx, wager):
    temp = await initBetMenu(ctx) #start up the betmenu and return the api response
    response = temp[0]
    msg = temp[1]

    #Selection box response for the fight the user wants to choose
    interaction = await bot.wait_for("select_option", check=lambda inter: inter.custom_id == "betMenu" and inter.user == ctx.author)
    choice = interaction.values[0]  #choice is the selected fight i.e. 'Covington vs Usman'
    if choice == 'Cancel':
      await interaction.send(content='🚫 You canceled your wager') 
      await msg.delete()  
      return


  
    #Let user choose the fighter they want to bet on
    choiceEmbed = chooseFighter(choice, response)
    await msg.delete()
    await interaction.send(embed=choiceEmbed, components=[[Button(label=response['fights'][choice]['Red']['Name'], custom_id="Red", style=4),
                                                          Button(label=response['fights'][choice]['Blue']['Name'], custom_id="Blue", style=1),
                                                          Button(label='Cancel', custom_id="Cancel", style=2, emoji='🚫')]])
    interaction2 = await bot.wait_for(
        "button_click", check=lambda inter: inter.custom_id == "Red"  or inter.custom_id == "Blue" or inter.custom_id == "Cancel"
    )
    choice2 = interaction2.custom_id
    #cancel wager
    if choice2 == 'Cancel':
      await interaction2.send(content='🚫 You canceled your wager')    
      return
    
    await interaction2.send(content='Your wager is being confirmed please wait...')
    verMsg = await verificationChecks(response,choice)
    if verMsg != '':
      await editInteractionMessage(interaction2,{'content' : verMsg})
      return
    #TODO:
    #duid, fightTitle, fighterChoice, link, wager, odds
    Database.placeWager(
      ctx.message.author.id,
      choice,
      response['fights'][choice][choice2]['Name'],
      response['url'],
      wager,
      response['fights'][choice][interaction2.custom_id]['Odds'],
      ufcDateFormatter(response['date']),
      choice2,
      int(calculatePayout(wager,response['fights'][choice][interaction2.custom_id]['Odds']))
      )

    #Remove wager from user's bank
    if Database.getUserBalance(ctx.message.author.id) >= wager:
      Database.updateUserBalance(ctx.message.author.id, -wager)
      await editInteractionMessage(interaction2,{'content' : 'Your wager has been placed!'})
      logUserActions(ctx,' placed a wager.')
    else:
      await editInteractionMessage(interaction2,{'content' : 'You do not have enough money. Check your balance with >menu'})
    
async def helpMenu(ctx):
  msg = await ctx.send(file=File('images/botImages/Menu.png'), components=[[Button(label='Upcoming Event', custom_id="Upcoming Event", style=3),
                                                          Button(label='Balance', custom_id="Balance", style=3),
                                                          Button(label='My Wagers', custom_id="My Wagers", style=3),
                                                          Button(label='Cancel', custom_id="Cancel", style=2, emoji='🚫')]])
  interaction = await bot.wait_for(
        "button_click", check=lambda inter: (inter.custom_id == "Upcoming Event" or inter.custom_id == "Balance"  or inter.custom_id == "My Wagers" or inter.custom_id == "Cancel") and inter.user == ctx.author
    ) 
  #cancel wager
  if interaction.custom_id == 'Cancel':
    await msg.delete()  #throws an error if user deletes it before bot deletes it
    await ctx.message.delete()
    return
  elif interaction.custom_id == 'Upcoming Event':
    await msg.delete()  #throws an error if user deletes it before bot deletes it
    await ctx.message.delete()
    await interaction.send(embeds=embedAllFights(await getUpcomingFights()))
    logUserActions(ctx,' viewed upcoming events.')
    return
  elif interaction.custom_id == 'Balance':
    await interaction.send(embed=balanceEmbed(ctx))
    await msg.delete()  #throws an error if user deletes it before bot deletes it
    await ctx.message.delete()
    logUserActions(ctx,' checked their balance.')
    return
  elif interaction.custom_id == 'My Wagers':
    wagers = Database.getWagersByDUID(ctx.message.author.id)
    await interaction.send(embed=wagersEmbed(ctx,wagers))
    await msg.delete()  #throws an error if user deletes it before bot deletes it
    await ctx.message.delete()
    logUserActions(ctx,' viewed their wagers.')
    return
  await interaction.send(content=interaction.custom_id)  


'''BOT COMMMANDS'''
@tasks.loop(minutes=30)
async def checkForWinners():
  if date.today().weekday() != 5 or date.today().weekday() != 6:  #if it is not saturday or sunday
    return
  #print(str(date.today())[5:])
  wagers=Database.getWagersByFightDate(str(date.today())[5:])
  if wagers:
    print('\t\tChecking Wager')
    url = wagers[0]['link']
    try:
      res = await getFightByURL(url)
    except:
      print('Error: in checkForWinners')
      return
    for wager in wagers:
      outcome = res['fights'][wager['fightTitle']][wager['fighterColor']]['Outcome'].lower()
      if outcome == 'win':
        Database.updateUserBalance(wager['dUID'],wager['payout'])
        Database.moveWagerToHistoryByID(wager['wagerId'],'win')
      elif outcome == 'loss':
        print('he lose')
        Database.moveWagerToHistoryByID(wager['wagerId'], 'loss')
      elif outcome == '':
        pass
      else:   #draw or no contest
        Database.updateUserBalance(wager['dUID'],wager['wager'])
        Database.moveWagerToHistoryByID(wager['wagerId'], 'draw')
  #get all fights for today

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}!")
    checkForWinners.start()

@bot.command()
async def bet(ctx):
  if not Database.getUserByDiscordUID(ctx.message.author.id):
    Database.addNewUser(ctx.message.author.name + '#' + ctx.message.author.discriminator,ctx.message.author.id)
    await ctx.send('Thank you, '+ ctx.message.author.name +' , for using BetBot! I have created an account for you. Use >Menu to check your balance, see upcoming fights, and more.')
  try:
    wager = int(ctx.message.content.split()[1])
  except:
    await ctx.send(content='When placing a bet make sure you include a space with your wager afterwards:\n >bet 420')
    return
  
  if wager > 0 and wager <= Database.getUserBalance(ctx.message.author.id):
    await betMenu(ctx, int(wager))
  else:
    await ctx.send(content='Make sure you are wagering more than 0 and less than or equal to the amount in your bank')

@bot.command()
async def menu(ctx):
  if not Database.getUserByDiscordUID(ctx.message.author.id):
    Database.addNewUser(ctx.message.author.name + '#' + ctx.message.author.discriminator,ctx.message.author.id)
    await ctx.send('Thank you, '+ ctx.message.author.name +' , for using BetBot! I have created an account for you. Use >Menu to check your balance, see upcoming fights, and more.')
  await helpMenu(ctx)
  
  #print(Database.getUserByDiscordUID(ctx.message.author.id))


@bot.command()
async def testing(ctx):
  print(ctx.message.author.display_name)
  print(ctx.message.author.discriminator)
  print(ctx.message.author.name)


bot.run(os.getenv('TOKENTEST'))
