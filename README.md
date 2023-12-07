# assignment-03
Deployment
database deployment
![Alt text](<deployment/database deployment.png>)
api deployment
![Alt text](<deployment/api deployment.png>)
client deployment
![Alt text](<deployment/client deployment.png>)
auth0 config
![Alt text](<deployment/auth0 modify.png>)
all deployment has completed

but, I encountered a error via api deployment, it was a prisma error in app log,
but Troubleshooting : "preinstall": "npm i -D prisma"
  "postinstall": "npx prisma db push", doesn't work
  ![Alt text](<deployment/api deployment err.png>)
so please still use localhost:8080 as api host
in client env

Lighthouse
![Alt text](<Lighthouse/app accessibility.png>)
![Alt text](<Lighthouse/home accessibility.png>)