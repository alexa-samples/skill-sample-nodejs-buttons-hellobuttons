# Build the AWS-Hosted Hello Buttons Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/gadgets/ECHO_BUTTONS_DEV_PORTAL_API_LAUNCH_BLOG_HERO_954x240_V1._TTH_.png" />


### Steps
1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com/alexa?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=hello-buttons-nodejs-V2_GUI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_fact-nodejs-V2_GUI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).  In the top-right corner of the screen, click the "Sign In" button.**
(If you don't already have an account, you will be able to create a new one for free.)

2.  Once you have signed in, move your mouse over the **Your Alexa Consoles** text at the top of the screen and Select the **Skills** Link.

3.  From the **Alexa Skills Console** select the **Create Skill** button near the top-right of the list of your Alexa Skills.

4. Give your new skill a Name, such as **Hello Buttons**. This is the name that will be shown in the Alexa Skills Store, and the name your users will refer to. Also change the locale if so desired.

5. Keep the default **Custom** model selected, and click the **Create skill** button on the top right.

6. On the Choose a template page, keep the default **Start from scratch** and click the **Choose** button.

7. **Build the Interaction Model for your skill**
	1. On the left hand navigation panel, select the **JSON Editor** tab under **Interaction Model**. In the textfield provided, replace any existing JSON with the JSON provided in the [Interaction Model](../models) (make sure to pick the model that matches your skill's language).  Click **Save Model**.
    2. If you want to change the skill invocation name, select the **Invocation** tab. Enter a **Skill Invocation Name**. This is the name that your users will need to say to start your skill.
    3. Click "Build Model".

8. **Build the Interaction Model for your skill**

9. If your interaction model builds successfully, proceed to the next step. If not, you should see an error.
Try to resolve the errors. In our next step of this guide, we will be creating our code.

     If you get an error from your interaction model, check through this list:

     *  **Did you copy & paste the provided code correctly?**  Hint: use the Raw button when viewing files in GitHub
     *  **Did you accidentally add any characters to the Interaction Model or Sample Utterances ?**

#### NEXT: Review and Deploy the AWS-Hosted Code
[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/next._TTH_.png)](./create-aws-hosted-function.md)

