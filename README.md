
![Logo](https://ik.imagekit.io/4liibdxmxfn/images/users/user-peter548604106-cover-1624546491192_fBp5lDxtY)

    
# Toi & Moi (You & Me)

Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world  with realtime messaging and friend system.  (Idea originated from starting a Facebook clone)

β­  Live Demo   (https://toi-moi.herokuapp.com/)
## Screenshots

![App Screenshot](https://ik.imagekit.io/4liibdxmxfn/images/users/user-peter548604106-cover-1624548236774_5Z3g7HK3Qq)


## Features

π±    Realtime Communication & Notification


![θ’εΉιθ£½-2021-06-25-δΈε10 53 21](https://user-images.githubusercontent.com/61279365/123363915-147dac80-d5a6-11eb-99ec-b06e194dc3c8.gif)


π    i18n - Internationalization

![θ’εΉιθ£½-2021-06-25-δΈε7 33 28](https://user-images.githubusercontent.com/61279365/123419339-b0caa200-d5ec-11eb-9c5f-e40fd2788e84.gif)


π    Light/dark mode toggle

![θ’εΉιθ£½-2021-06-25-δΈε10 38 20](https://user-images.githubusercontent.com/61279365/123364070-5d356580-d5a6-11eb-9974-d3c3809458e7.gif)

   
π§.  Customized EDM (Cross Email Service Provider Compatibile)

![ζͺε 2021-06-26 δΈε2 53 07](https://user-images.githubusercontent.com/61279365/123504865-5c77fe80-d68e-11eb-9bbd-2ff42768c952.png)

  
## Functionality

Login System, Realtime Messaging & Notification, New Feed Posting, i18n - Internationalization, Infinite Loading, Image Upload, Personal Profile Builder ,Customized EDM, Theme Switch , RWD  
  
## Tech Stack

**Client** 

β¨   Next.js, Redux, TailwindCSS , Socket.io-client , MJML(Customized EDM)

**Server** 

β¨ Node.js, Express.js , Socket.io , Nodemailer

**Database** 

β¨ MongoDB

  
## Deployment

π **Heroku**
οΌ Easy to maintain and operate. Suitable for traffical level of a non-product website.

  
## Demo

Live Demo
  https://toi-moi.herokuapp.com/
  
  
## Problems Ecountered

- Problem: tailwindcss group-focus not working on mobile
- Fix: change it to useClickAway custom hook
- Problem: Next/Image responsive not available without setting a width or height
- Fix: CSS Fix
- Problem: react-konva outputs Must use import to load ES Module [error]
- Fix: The problem lies in SSR, as react-konva doesn't support SSR , so instead of importing react-konva in a page component, wrap it inside a regular component, and use dynamic import with SSR:false .
- Unlimited Rerender when trying to destructure redux state 
