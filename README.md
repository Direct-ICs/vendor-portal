# Direct ICS Customer Portal
## Table of Contents
1. [Access](#🔑access)
    - [Customers](#customers)
    - [Developers](#developers)
        - [Getting it up and running](#getting-it-up-and-running-locally)
        - [Cloudways/Server info](#cloudways-server)
2. [Deploying](#📌-deploying)
    - [Server](#server)
    - [Client (Front end)](#client-font-end)
3. [Credit](#trophy-credit)

## 🔑Access
### Customers
Website: [customers.directics.com](https://customers.directics.com)
<br>
Users can also access it through the main [website](https://directics.com/).

### Developers
#### Getting it up and running locally
1) Make sure you have GitHub installed. Instructions [here](https://github.com/git-guides/install-git)
2) Create a folder where the project will live locally
3) Go into GitBash or VSCode (or your favorite IDE) and clone the repo with `git clone git@github.com:Direct-Components/customer-dashboard.git` or, use the HTTPS one, found at the top of this page under "Code"
4) Run `npm install` to install all dependencies needed. You may have to `cd client` and `cd server` individually to install, as well.  
4) `git checkout -b main/username` to checkout a branch for your changes
5) Go to the root directory and run `npm run develop` to start the program. 
    - The project uses Nodemon to auto restart Nodejs and React auto reloads on change. This command will bring both up automatically.

#### Cloudways server
Server: [cloudways](https://cloudways.com)
<br>
The project lives in Cloudways under project "Customer Portal." You may access the files through [Filezilla](https://filezilla-project.org/) (graphic UI) or [PuTTY](https://www.putty.org/) (command line). Login information for the server can be found under Cloudways, and the IT manager has login information for Cloudways. You may also reach out to DSG for service issues and general support.
<br>
Notes:
- Server files are in <b>private_html</b><br>
- Public (client files) are in <b>public_html</b><br>
- <b>NEVER</b> place server files in public_html.
- Secrets are in <b>zoho.config.js</b>, in private_html -> config
- Access/Refresh codes are in private_html -> scratches
    - <b>DO NOT SHARE THESE. THEY ALLOW ACCESS TO CREATE/DELETE/UPDATE ZOHO RECORDS IN CRM/BOOKS/CREATOR</b>

## 📌 Deploying
Push changes to GitHub, then open a pull request and have it merged (or merge it yourself)
### Server
1) Connect to either [`Filezilla`](#cloudways-server) or [`PuTTY`](#cloudways-server). Move the files from _/server -> private_html_
2) Through PuTTY, query to _public_html_ and run command `pm2 kill` then `pm2 start ecosystem.config.js`. This will restart the server.
### Client (Font-End)
GitHub is SSH key connected to Cloudways through the _gh-pages_ branch. You may update _gh-pages_ by running 
`
npm run build
`
in the root directory of the file. This will build the react files and push them to github, then right over to cloudways. This does not need a server restart to take effect on the main website.

>Running this will affect the live website. Do not run this command unless you are ready for your changes to take effect!

## :trophy: Credit
All work was done internally at DCI, by [Matt Pityo](https://github.com/mpityo) (architect/programmer/font and back end/documentation)
<br>
Design was heavily influenced by Zoho's Client Portal through books, which is what this was based on to replicate functionality (and add more)