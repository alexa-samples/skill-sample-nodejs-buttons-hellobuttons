# Build An Alexa-Hosted Hello Buttons Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/gadgets/ECHO_BUTTONS_DEV_PORTAL_API_LAUNCH_BLOG_HERO_954x240_V1._TTH_.png" />


With an Alexa-hosted skill, you can build, edit, and publish a skill without leaving the developer console.
The skill includes a code editor for managing and deploying the backend code for your skill.
For details on what the Alexa-Hosted skills service provides, open [this page](https://developer.amazon.com/docs/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html) in a new tab.

### Steps
1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com/alexa?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=hello-buttons-nodejs-V2_GUI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_fact-nodejs-V2_GUI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).  In the top-right corner of the screen, click the "Sign In" button.**
(If you don't already have an account, you will be able to create a new one for free.)

2.  Once you have signed in, move your mouse over the **Your Alexa Consoles** text at the top of the screen and Select the **Skills** Link.

3.  From the **Alexa Skills Console** select the **Create Skill** button near the top-right of the list of your Alexa Skills.

4. Give your new skill a Name, such as **Hello Buttons**. This is the name that will be shown in the Alexa Skills Store, and the name your users will refer to. Also change the locale if so desired.

5. Keep the default **Custom** model selected, and scroll the page down.

6. Choose **Alexa-Hosted** for the method to host your skill's backend resources.  Scroll backup and select the **Create Skill** button at the top right.
It will take a minute to create your Alexa hosted skill, then you will be taken to the Build tab of the console.

7. On the Choose a template page, keep the default **Start from scratch** and click the **Choose** button.

8. **Build the Interaction Model for your skill**
    1. If you want to change the skill invocation name, select the **Invocation** tab. Enter a **Skill Invocation Name**. This is the name that your users will need to say to start your skill.
    2. Click "Build Model".

9. If your interaction model builds successfully, proceed to the next step. If not, you should see an error.
Try to resolve the errors. In our next step of this guide, we will be creating our code.

     If you get an error from your interaction model, check through this list:

     *  **Did you copy & paste the provided code correctly?** Hint: use the Raw button when viewing files in GitHub
     *  **Did you accidentally add any characters to the Interaction Model or Sample Utterances ?**

#### NEXT: Review and Deploy the Alexa-Hosted Code
[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/next._TTH_.png)](./create-alexa-hosted-function.md)

