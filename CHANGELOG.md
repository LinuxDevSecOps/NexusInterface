# 1.2.3 (2019.9.5)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/v1.2.3)

#### Additions

- none

#### Adjustments

- New Developer setting to allow for SymLinks in a modules directory

#### Fixes

- Fixed a issue where a send would not send if your wallet was not encrypted
- Fixed issue with send all not taking into account network fee
- Send Page / My Addresses now properly refreshes after your balance has been confirmed after a transaction
- Fixed an error in the terminal console which would not return the correct error message

# 1.2.2 (2019.8.23)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/v1.2.2)

#### Adjustments

- **SECURITY**
  - Modules will now fail to install if it contains a symbolic link
  - Nexus.conf auto password generate has added additional entropy, old password style will automaticly be replaced
- Module specification version is bumped to 0.2.1
- Staking stats (Stake Rate, Trust Weight, etc...) in Overview page now displays "N/A" instead of "0%"

#### Fixes

- Transactions time filter is now working as expected
- New transactions will now show up automatically in Transactions page
- Immature balance now has the same number of decimal places as Balance
- Search Address box in Transactions page is now working
- Overview page no longer hides stats when they're unavailable

# 1.2.1 (2019.8.15)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/v1.2.1)

#### Additions

- Improved Translations
- Added "Reload transaction history" button to Core Settings
- Added `walletClean` hidden setting which indicates the core should run with `-walletclean` parameter (the same as "Reload transaction history" functionality) the next time it starts up when set to true
- Added BTC to base currencies

#### Adjustments

- Updated Nexus Core to [v3.0.5](https://github.com/Nexusoft/LLL-TAO/releases/tag/3.0.5)

#### Fixes

- Fixed issues with the transaction page
- Fixed Transaction Details modal not showing up
- Fixed issue with auto updates with Linux-AppImage
- Bootsrapper will now show the correct message while the database is extracting
- Fixed Market page layout
- Immature transactions will now automatically updated when it matures

# 1.2.0 (2019.8.09)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/v1.2.0)

#### Additions

- New internal localization system
  - Use our crowdin page to improve translations
- New translations
  - Arabic
  - Simplified Chinese
  - Finnish
  - Hungarian
- Added Ability to use IP Whitelist for mining
- Added Ability to turn off Avatar mode
- New onboarding screens on the first time the wallet runs, it will prompt you to select language and accept Terms and Conditions before starting
- Added a "Send all" option in Send NXS page
- If you try to send NXS while you're not logged in or logged in for staking only, it will now ask you for password to send instead of having you to manually log out and log in again

#### Adjustments

- Transactions page layout is cleaner, transactions chart is put into a modal
- Transactions page performance is vastly improved
- Transactions table: Number column is removed; Time column format is slightly shortened; pending, orphan, and immature transactions are faded; pending transactions now show the number of confirmations they have
- Removed Trust on the category dropdown
- New system for changing core settings and alerting a needed core restart
- Percentage based stats (Stake Rate, Trust Weight,...) now limited to 2 decimal digits
- Staking status icon now indicates clearly whether wallet is staking and shows less stat numbers for simplicity
- Revamped internal translation system to enable faster development speed and higher translation coverage
- Numbers are now also formatted depending on the selected language, e.g. if you select French for wallet interface, 1.02 will be displayed as 1,02
- More user-friendly "Last updated" tooltip for Block count stat on Overview page
- "Stake" stat is now more precisely called "Immature balance"
- Login timout settings is now disabled if "staking only" option is checked
- Download transactions history CSV no longer includes historical fiat & BTC values

#### Fixes

- Stake and Trust transactions now properly show on the transaction page
- Eliminated double scrolls in Transactions page
- Orphans no longer show as `(Pending)`
- Fixed a issue where the manual mode settings were not being save as the button had been removed
- Fixed error message being unclear in some cases
- Fixed Encryption warning modal showing up on closing
- Fixed bootstrap suggestion modal popping up twice in some cases

# 1.1.0 (2019.7.19)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/1.1.0)

#### Additions

- Orphan is now a option on the Transaction Table
- Added `Hidden Balance` option in overview display settings to allow users to privately share their overview page
- Added functionality to the Balance stat on overview page to change to fiat balance on click
- Wallet position on screen is now remembered for the next time it's opened
- Added a warning on balance reminding it might not be up-to-date when the wallet is not fully synchronized
- Added ability to disable the Transaction Chart.
- Added Portuguese Language.
- Added a link to Nexus Wallet Guide under Help menu

#### Adjustments

- Updated Spanish Translation
- Updated styling on `Market Data` page to make 24hr info be clearer
- Default Verbose is now 0, you can change this in the Settings/Core
- Changed the way the More Details modal knows which transaction to look up
- Fake Transactions for testing is now moved out of auto true in dev mode and is now a toggle.
- When selecting the a suggestion on the terminal page, the help portion will no longer be pasted into the input field
- Globe now has a hard display cap of 64, this does not effect your actual backend connections
- Transactions in the transaction table now have a fixed height
- Terminal console now fills only the command (without the description) when a suggestion is selected
- Quit Nexus menu item will now always quit the app regardless of "Minimize on close" setting
- Either Start Daemon or Stop Daemon menu item will be available at one time depending on whether the daemon is running or not
- Login form date input now won't let you select a day in the past
- Updated wording: use "Core" and "Nexus Core" instead of "Daemon"
- Various reorganization and optimizations of the internal structure
- Updated project's dependencies
- Bumped Nexus Wallet Module Specification version to 0.2.0

#### Fixes

- Fixed issue were if you never installed QT or deleted the QT back up it would auto make a new backup
- Fixed there being a `Nexus_Wallet` AND `Nexus Wallet` folders, Removed `Nexus_Wallet` and will auto move items into correct folder
- Fixed issue with Received transactions not being shown in the table when selecting Receive Only Filter.
- Fixed issue where the daemon would not be set to verbose 0, and set a min/max on the setting
- Fixed issue where you could not copy the Address or Account from a transaction
- Fixed issue where scrolling in the transaction table would also scroll the parent panel
- Fixed incorrect synchronization status icon in some cases
- Fixed My Addresses not showing addresses in some cases
- Fixed some bugs with Bootstrap Recent Database function
- Various typo fixes

# 1.0.1 (2019.6.28)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/1.0.1)

#### Additions

- Ships with 3.0.1 [Tritium Daemon Core](https://github.com/Nexusoft/LLL-TAO/releases/tag/3.0.1)
  - Fixed uninitiated values in Binary Hash Map for nFlags
  - On rescan, allow search for block when key is found for given user
  - Cleanup unnecessary constructors in Sector Database
  - Remove error reporting for incorrect sector size in Update
- Added Stake/Generate/Immature to Transaction's page category filter
- Added tooltip to the tray icon
- Double click on the tray icon now shows the wallet GUI
- Added Polish Language

#### Adjustments

- Now only one instance of wallet can be run at the same time
- Changed "Stake Reward" on Overview page to "Stake Rate"
- Changed overview Balance and Stake stats to account of visual in balance

#### Fixes

- Added Stake to the Transaction Table Filter, Stake transactions will now show up
- Fixed bug that would sometimes result in the daemon failing to start
- Fixed Fiat display issue on Balance on the overview page
- Fixed functionality that allows for indefinite login
- Fixed time constraint on Login form
- Fixed issue leading to falsely displaying fully synced icon when syncing is incomplete

# 1.0.0 (2019.6.26)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/Release-1.0.0)

#### Additions

- Module based extension functionality
  - More information about the module system [here](https://nexusoft.github.io/nw-modules-documentation/)

#### Adjustments

- English language text optimizations
- Removed redundant tool-tip on re-scan button
- Renamed the `Market Information` page to `Market Data`
- Reduced decimal accuracy displayed for NXS values on the `Market Data` page
- Removed `Minimalist` overview screen layout option
- Removed Cryptopia from `Market Data` page

#### Fixes

- Fixed bug that would lead to an infinite loop of Low Disk Space warnings
- Fixed calculation error in determining percent change in price on the `Market Data` page
- Fixed bug where `My Addresses` modal on the overview screen was un-scrollable

# 0.9.0-alpha4 (2019.3.30)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/Release-0.9.0)

#### Additions

- Tritium Cores
- New CSV download functionality for Transaction page
- New Currency icons for fiat balance
- Added links to the exchanges on the Market page
- New Globe backend code, will allow for expanded functionality

#### Adjustments

- There is now a max of `0.1` Nexus for the transaction fee setting
- Moved `Download Recent Database` to file dropdown
- Trust and Stake numbers now only show 6 significant numbers
- Replaced Rescan Wallet on `My Addressess` with `Check Wallet` and moved button to `Settings/Core`
- Changed scalling on screens under 720px high
- The Sample Address in Style Settings has been replaced with the User's Default Address
- The `X` on the add or edit contact form is now more visible
- Made grammar ajustments to en.json
- Ajustment to terminal's `Help` command
- Rephrased some instances of Staking to Minting to more accurately convey what is happening
- Gather Transactions on the transactions page is now handled better

#### Fixes

- Fixed typo on Israeli Shekel using the wrong ISO code
- Pressing Enter on the Terminal Page no longer displays the auto suggest
- Pressing Enter on the Terminal Page now properly removes focus from input field
- Fixed Pending Transaction label in transaction detail modal
- Fixed `Fee` not displaying on send transactions in the detail modal
- Fixed price history file not being created/read properly
- About page correctly displays the backend core version
- Fixed issue with Login Time Out
- Encryped warning no long shows before accepting license agreement
- Fixed issue with Globe crashing on Webgl Errors
- Fixed context menu issue
- Fixed issue with Terminal where if a param started with a number it would only return that partial number

# 0.8.9 (2019.3.01)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/Release-0.8.9)

#### Additions

- Added rescan buttons to allow for easy rescan of the wallet
- Addresses now on the add recipient

#### Adjustments

- Bootstrap only stops the core when it is finished downloading
- Improved Terminal Page
- App now remembers the last setting tab selected
- Improved auto suggestions

#### Fixes

- Fixed issue with auto updates, The app will now look for updates and ask the user if they want to upgrade
- Fixed issue with a crash using `minimalist` or `none` view
- Fixed issue were changing a color made the background turn to the light theme
- Fixed issue with account names in the Transaction page

# 0.8.8 (2019.2.22)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/Release-0.8.8)

#### Additions

- Added Dutch/Nederlands Language
- Brand new Address Book interface
- New setting to set Nexus address format

#### Adjustments

- Language Improvements
- Nexus Data and App folder now will be marked with `Beta` instead of the version number so users do not need to rebootstrap or lose settings
- Removed unused packages from dependency list
- Market Data tooltips now with shift left or right in order for them to display center to the graph
- Transaction Chart in Transaction page now responds to Theme
- Transaction Graph now responds to Theme, transaction bar colors remain fixed.
- On the send page the `X` to remove recipients from a send many now displays at all time

#### Fixes

- Closing the app while in Manual mode no longer tries to stop the manual Daemon
- Dock now properly hides and shows on Mac OSX if minimize on close is active

# 0.8.7 (2019.2.15)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/Release-0.8.7)

#### Additions

- There are now additional display options for the overview page, see Settings/App

#### Adjustments

- Low disk warning has been reduced to 1gb for manual syncing
- Market page charts now respond to Theme adjustments
- Terminal page font has shrunk for both terminal and console output
- Renamed Dark theme background
- Removed `?` from the move NXS button
- Reordered the languages and replaced the US flag with a US/GB flag for English
- Adjusted some padding on the footer

#### Fixes

- Language translation improvements
- Fixed fiat selection bug
- Fixed typo with GBP where the app would not start up
- Fixed an issue where using the filters in the transactions page would cause the app to gray screen
- Fixed an Issue where the Nav Icon pulse was being cut off
- Fixed issues where transactions would still be labeled as 'Pending'

# 0.8.6 (2019.2.1)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/Release-0.8.6)

#### Additions

- Theme file now accepts a URL and will auto download and store in App Data
- Theme is now in its own file named Theme.json
- You can now have a select a Light Theme
- You can now use custom colors but use a built in background
- The Send Queue has been revamped
- Now checks to see if you have 10gb of free space and will warn you each time you get a new block
- Closing nexus now performs better

# 0.8.5 (2019.1.18)

[Release Link](https://github.com/Nexusoft/NexusInterface/releases/tag/Release-0.8.5)

#### Additions

- New Css and layout all over the app
- Includes new 2.5.5 backend
- Better explanation on Exchange Page
- You can now import a theme json file
- Made changes to the Market Page’s charts
- Now added volume for each exchange
- Reconfigured bootstrap modal to have a progress bar that shows kb downloaded
- New loading message on Trust List

#### Bug Fixes

- Fixed issues with the settings page not saving

# 0.8.4 (2018.12.27)

#### Additions

- UI Improvments
- You can now change your Language
- Reconfigured File Menu
- Seperate Staking Balance on overview page
- You can now set a local minimum confirmations for the transactions and wallet balances
- Move now works over UTXO
- You can now select different accounts in the transaction page
- Both Core Output and Terminal now focus to the bottom
- Added a pause button in the Core Output page
- Modified the terminal to have a leading message per command
- Added backup directory picker
- Bootstrap will now alert user if there is not enough space
- Added ForkBlock functionality to settings.json (Add “forkblocks=_number_” to settings.json)
- Bootstrap now deletes old zip after extraction
- Started Deprecating “Send” and “Receive” for “Debit” and “Credit”

#### Bug Fixes

- Overall bug fixes
- Improved chart to better display the data for transactions
- Core Output and Terminal now word wrap properly
- Fixed Issue with RPC commands that had multiple nested objects
- Fixed issue with the app when switch between internal and manual daemon mode

# 0.8.3 (2018.10.1)

#### Private Internal Release

# 0.8.2 (2018.9.15)

#### Private Internal Release

# 0.8.1 (2018.9.1)

#### Private Internal Release

# 0.8.0 (2018.8.1)

#### First Private Internal Release
