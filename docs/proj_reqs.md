# Project Requirements

## Executive Summary

This web application will allow NSTEP to hear the stories of their diverse group of clients by enabling them to share their experiences with NSTEP, and give NSTEP a qualitative measure of assessment by which to evaluate the quality of their programs and report to funding agencies. The application will support multiple languages and allow clients to give feedback in various formats (text, audio, video, etc), as well as allow admins to set up questionnaires and view stories. Users of the system will consist of two distinct groups - NSTEP program participants and NSTEP employees monitoring responses on the administrative side of the application.

## Project Glossary

**Story**

- An experience or feedback that is shared by a **client**

**Language**

- A natural language (not a programming language)

**Client**

- Children, their parents and grandparents, teachers and community agency program leaders

## User Stories

**US 1.01**  
As an Admin, I want to be able to securely log in, so that I can have private access to administrative functionalities of the system.    
Acceptance Tests:
- Admin can login to their account with correct credentials
- Admin can provide an email and password to login
- Admin cannot login with incorrect credentials

**US 1.02**  
As an Admin, I want to be able to set up a program-specific questionnaire, so that I can define the kind of feedback I want to collect.    
Acceptance Tests:
- Admin can create a custom questionnaire
- Admin can assign a questionnaire to a specific program

**US 1.03**  
As an Admin, I want to be able to create unique URLs for each feedback form of a particular program, so that I can let respondents quickly access the feedback form for the program they attended.    
Acceptance Tests:
- Admin can generate a unique URL for each feedback form they create
- Each unique URL links to the correct form

**US 1.04**  
As an Admin, I want some way to grasp the general sentiment of the feedback, so that I can understand how people largely feel about the programs.    
Acceptance Tests:
- Admin can view general feedback sentiment
- Feedback sentiment is accurate

**US 1.05**  
As an Admin, I want to export feedback, if the format of the feedback allows it, so that I may share the results to funders.    
Acceptance Tests:
- Admin can export feedback in csv format
- File contains the correct information

**US 1.06**  
As an Admin, I want to be able to search for stories by timeline and/or program, so that I can view feedback for a particular program or time of submission.    
Acceptance Tests:
- Admin can search and view stories by timeline
- Admin can search and view stories by program

**US 1.07**  
As an Admin, I want to get feedback in its original form as well as a translated version, so that I can retain authentic feedback but also be able to understand the feedback if it is not in English.    
Acceptance Tests:
- Admin can view feedback in its original form
- Admin can view translated feedback
- Original and translated versions of feedback are accurate

**US 1.08**  
As an Admin, I want to be able to generate a custom QR code for each program survey, so that users can easily access the feedback page for the program without typing a URL.    
Acceptance Tests:
- Admin can generate a unique QR code for each feedback form
- Each unique QR code is associated with the correct form

**US 2.01**  
As a Super Admin, I want to be able to create accounts, so that I may give other staff members access to admin privileges.    
Acceptance Tests:
- Super Admin can create admin accounts
- Can login to created accounts
- Created accounts have access to administrative functions

**US 2.02**  
As a Super Admin, I want to be able to remove accounts, so that I am able to take away admin privileges.    
Acceptance Tests:
- Super Admin can delete admin accounts
- Cannot login to deleted accounts

**US 3.01**  
As a User, I want to be able to leave feedback in text, so that I may type my response to a questionnaire.    
Acceptance Tests:
- User can type answers to questions
- User can submit their typed response

**US 3.02**  
As a User, I want to be able to leave feedback in a voice recording, so that I can express verbally.    
Acceptance Tests:
- User can record their voice to respond to questions
- User can submit their voice recording

**US 3.03**  
As a User, I want to be able to leave feedback in video format, so that I can express myself comfortably.    
Acceptance Tests:
- User can record a video to respond to questions
- User can submit their video recording

**US 3.04**  
As a User, I want to be able to select from various emojis as feedback, so that I can easily express my feelings.    
Acceptance Tests:
- User can select an emoji in a feedback form
- User can submit their selected emoji

**US 3.05**  
As a User, I want to be able to leave feedback anonymously, so that I can still leave feedback if I do not wish to share my identity.    
Acceptance Tests:
- User can give feedback without providing personal information
- User can submit their feedback

**US 3.06**  
As a User, I want the web app to support multiple languages, so that I am able to comfortably navigate the website and leave feedback.    
Acceptance Tests:
- User can select a language
- User can view the content of the web app in their chosen language
- Translations are accurate and coherent

**US 3.07**  
As a User, I want to be able to make my story publicly visible, so that I may share my experience with others.    
Acceptance Tests:
- User can determine the public visibility of their story
- Story is only visible to others if marked as public

**US 3.08**  
As a User, I want to be able to share my story by email, so that I can recommend a program to someone else.    
Acceptance Tests:
- User can share their story through email
- Shared story is received by the intended recipient(s)

**US 3.09**  
As a User, I want to be able to use my phone to navigate the website and give feedback, so that I do not need to access a desktop.    
Acceptance Tests:
- User can access the website on their phone
- Features of the website are usable on mobile devices

## Similar Products

[Google Forms](https://www.google.ca/forms/about/)

- Offers form creation, templates, real-time results analysis, etc
- May be used as inspiration for designing user-friendly, functional forms

[WordClouds.com](http://wordclouds.com/)

- Word cloud generator
- May be used as inspiration for the appearance of in-app word clouds

[Typeform](http://typeform.com/)

- Offers form creation, templates, etc
- May be used as inspiration for designing beautiful, interactive forms

[Jotform](http://jotform.com/)

- Offers form creation, templates, etc
- May be used as inspiration for designing simple, usable forms

## Open-source Products

[Plotly Dash](https://dash.plotly.com/)

- Python framework for building data apps
- May be used for coding the admin dashboard
- Ties modern UI elements like dropdowns, sliders, and graphs directly to your analytical Python code

[NLP.js](https://www.npmjs.com/package/node-nlp)

- Natural language utility for Node
- May be useful for capturing emotions from feedback
- Functionalities include but are not limited to sentiment analysis and language guessing for phrases

[Formik](https://formik.org/)

- React form library
- May be useful for handling form creation
- Functionalities include but are not limited to input validation, formatting, masking, arrays, and error handling

## Technical Resources

General:

- [Stack Overflow](https://stackoverflow.com/)
- [GeeksforGeeks](https://www.geeksforgeeks.org/)

Frontend: React.js + React Router + Material UI

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Router Documentation](https://v5.reactrouter.com/web/guides/quick-start)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)

Backend: Django + MySQL

- [Django Documentation](https://docs.djangoproject.com/en/4.1/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

Deployment: Cybera RAC

- [Cybera RAC Documentation](https://wiki.cybera.ca/display/RAC)
