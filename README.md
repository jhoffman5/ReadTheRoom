# ReadTheRoom

Jaxon Stout, Adam Curtis, Gavin Kaepernick, Josh Hoffman, Andrew Senkbeil, David Zikel
(Collectively: We are Jéff)
4/29/2019


# Overview:
Read the Room is a chatroom that reports and records the sentiment of the room based on the messages sent by the users inside it over the web for all to see. Users can join and leave the room with their own account, and can search through all of chat rooms knowing the vibe before they even enter.

# Scenarios:

## Scenario 1: Jeff. 
Jeff wants to talk to more users with the same name as him. He idolizes the name Jeff and its variations and wishes to engorge upon his own image. He logs into Read the Room with his username “@Jeff” and creates his own room: “Jeffs_Room”. His other lovely Jeff buddies hop on in and chat about the enjoyment they feel for being Jeff, resulting in a peaceful blue background on their screen, signifying happiness and peace.
## Scenario 2: Robert. 
Robert is a portly old gentleman that hates Jeff. In fact, he hates everyone with the name Jeff. He creates a Read the Room username “@xXJeffHaterXx” and sees the most popular page : “Jeffs_Room”. He sees that the room has a blue mood, and wants to change that. He starts ranting about how much he hates Jeff. The room changes to have a red background, and the Jeffs are upset. Robert is pleased to scroll up and see the background color turn from a happy blue to an angry red.
## Scenario 3: Geoff. 
Geoff also wishes to chat with other like-minded Jeffs and Geoffs, and logs into Read the Room with his username “@Geoff”. He sees “Jeffs_Room” has a lot of popularity! Unfortunately, the vibe is red. Normally, Geoff is a very positive guy, and on most days he would try to bring back the morale of the other Jeffs, and hop on in. But today, Geoff just wants to start over, so he creates another chatroom, “Geoff_and_Jeff_can_coexist” and the other Jeffs soon follow to the positive vibes of that room.
Screen by Screen specification:
There will be 3 screens, all created in HTML with a lovely, effervescent stylesheet making it look like it should be on the cover of vogue. Each screen will have a known name with an underline

# LOGIN - 
	Two sides, divided down the middle. Each side will have a username and password box. The left side will have a button to create a new profile. The right side will allow the user to sign in to an existing profile. The title, “Read the Room” will be at the top center of the login page.
	When the user logs in, it checks if the name exists in the database. If it does, it will check if the password is correct, and will notify the user if neither of them work.
When a user makes a new account, it will check to see if the username is unique, and will input the username and password into the database.

# ROOM SEARCHER -
	There will be a logout button at the top left of the screen to allow the user to navigate to the login screen.
There will be a text box in the center to search for rooms, with a drop down list containing a list of the rooms sorted by popularity. Each room will display its current sentimental color next to the room and number of people in the room. The text box will also allow a user to input their own room name, so a new room can be created.

Side Note - If all goes well, some advancements might occur: sort by sentiment score

# CHAT ROOM -
	Previous messages will be displayed in a scrolling pane, and the background color of the room will be determined using sentiment analysis. The mood score of the room will be determined by passing the last 50 messages to the sentiment analysis and converting the score from a range of -5 to 5 into a red to white to blue gradient. The color will be updated in blocks of 10 messages, and will be based off of the average sentiment of the last 50 messages. Below this pane, there will be a text input field with a “submit” button and a box showing the current detected mood of the typed message labeled “Preview mood” that will change to the color gradient when clicked, so that the user can reword the message if the detected mood is incorrect.  Users will be able to see who sent each message. There will be a “back” button on the top left of the page to take the user to the Room Searcher page.
If all users leave the room, the room will close and the sentiment and other information will be deleted.

Open issue:
Possible future advancements: displaying all users in the room
Even further down the line if-all-goes-well advancement:  each user will display their own personal sentiment score.

Stretch-goals:
Changing passwords
A “close room” button (instead it will close when nobody is in the room)
