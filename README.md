##Hello Buttons Skill

These instructions show how to create a simple skill called Hello Buttons. This skill demonstrates how to send directives to, and receive events from, Echo Buttons. **Note:** Hello Buttons demonstrates how to use the gadget interfaces ([Game Engine](https://developer.amazon.com/docs/gadget-skills/gameengine-interface-reference.html) and [Gadget Controller](https://developer.amazon.com/docs/gadget-skills/gadgetcontroller-interface-reference.html)). It is not intended to be a comprehensive example. For an end-to-end skill, please refer to the Color Changer skill in the Gadgets Skill API Beta email.

This sample skill uses:
* The [developer portal](https://developer.amazon.com/home.html) to configure the skill and specify the interaction model* The [Node.js](https://nodejs.org/en/) framework for the skill code* [AWS Lambda](https://aws.amazon.com/lambda/) to host the skill* The [Alexa Skills Kit (ASK) SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) to simplify the skill code

##Table of Contents
* [Hello Buttons Skill Flow](##Hello Buttons Skill Flow)* [Preparation](##Preparation)* [Step 1: Upload the Deployment Package to AWS Lambda](##Step 1: Upload the Deployment Package to AWS Lambda)* [Step 2: Find the ARN of the Lambda function](##Step 2: Find the ARN of the Lambda function)* [Step 3: Enter the Skill Information](##Step 3: Enter the Skill Information)* [Step 4: Create an Interaction Model](##Step 4: Create an Interaction Model)* [Step 5: Configure the Skill](##Step 5: Configure the Skill)* [Step 6: Add Publishing Information](##Step 6: Add Publishing Information)* [Step 7: Add Privacy and Compliance Information](##Step 7: Add Privacy and Compliance Information)* [Step 8: Enable the Skill in the Alexa App](##Step 8: Enable the Skill in the Alexa App)* [Step 9: Invoke the Skill](##Step 9: Invoke the Skill)

##Hello Buttons Skill FlowWhen the Hello Buttons skill begins, it will send [animation directives](https://developer.amazon.com/docs/gadget-skills/control-echo-buttons.html#animate) for the three possible trigger events (`buttonDown`, `buttonUp` and `none`) to all the Echo Buttons. Alexa will then ask you to press the buttons, and she will start reading [lorem ipsum](https://www.lipsum.com/).
When you press a button, the skill will interrupt Alexa’s speech. If the button that you pressed is not awake, the skill will initialize the button by sending animation directives for `buttonDown`, `buttonUp` and `none` to that button. This is different from the original `LaunchRequest` intent, which sent initialization directives to all buttons.If the pressed button wakes up, you will see a different color on `buttonDown` and `buttonUp` events, as well as a breathing animation for the `none` event. If you cancel the skill (for example, by saying “Alexa, cancel”) or the Input Handler expires, the buttons will fade from white to black.

##Preparation
Before you create the Hello Buttons skill, you must take the following steps:

* **Create an Amazon developer account** – If you don’t already have an Amazon developer account, go to the [developer portal](https://developer.amazon.com/edw/home.html#/) and select **Sign In** in the upper right to create a free account.

* **Sign up for AWS** – If you haven’t already, sign up for AWS by going to [AWS Free Tier](https://aws.amazon.com/free/). For most developers, the [AWS Lambda Free Tier](https://aws.amazon.com/lambda/pricing/) is sufficient for the function that supports an Alexa skill.

* **Get Echo Buttons** – This skill requires two [Echo Buttons](https://www.amazon.com/Echo-Buttons-Alexa-Gadget-Pack/dp/B072C4KCQH/).

##Step 1: Upload the Deployment PackageIn this step, you upload the deployment package (HelloButtonsDeploymentPackage.zip) to AWS Lambda. Later, when you set up the skill in the developer portal, you will specify that this function is the endpoint for the skill.

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/console/home?region=us-east-1#) and navigate to the [AWS Lambda console](https://console.aws.amazon.com/lambda/home?region=us-east-1), which is located under **Compute** services.
2. Using the region selector at the top right of the page, select **US East (N.Virginia)**.3. Select **Create function**.4. Select **Author from scratch**.5. For **Name**, enter `HelloButtons`.6. For **Runtime**, select **Node.js 6.10**.7. For **Role**, select **Create new role from template(s)**.8. For **Role name**, enter `HelloButtonsRole`.9. From the **Policy templates** list, select **Simple Microservice permissions**.10. In the lower right, click the **Create function** button. The function might take a moment to create.11. Under the **Function code** section, for **Code entry type**, select **Upload a .ZIP file**. Then click **Upload** and choose the **HelloButtonsDeploymentPackage.zip** file.12. For **Runtime**, select **Node.js 6.10**.13. Under the **Designer** section, under **Add triggers**, select the **Alexa Skills Kit** option, andthen select the **Add** button in the lower right.
14. At the top of the page, select **Save**.

##Step 2: Find the ARN of the Lambda functionIn this step, you find the Amazon Resource Name (ARN) of the Lambda function that you just created. The ARN serves as the ID of the function. You can find the ARN at the top right of the Hello Buttons function page in the AWS Lambda console. The ARN will look somethinglike `arn:aws:lambda:us-east-1:012345678910:function:HelloButtons`.
Copy the ARN. Later, when you set up the Hello Buttons skill in the developer portal, you will provide this ARN as the endpoint for the skill.

##Step 3: Enter the Skill Information
Next, create the skill in the developer portal by using the following steps:1. Sign into the [developer portal](https://developer.amazon.com/edw/home.html#/). From the menu along the top of the page, select **Alexa** if it is not already selected.2. Under **Alexa Skills Kit**, select **Get Started**.3. Select **Add a New Skill**.4. For **Skill type**, select **Custom Interaction Model**.5. For **Name**, enter **Hello Buttons**.6. For **Invocation Name**, enter **Hello Buttons**.7. Under **Global Fields**, for **Gadgets Skill API**, select **Yes**. This causes the **Gadget Controller** and **Game Engine** options to appear.8. Select **Gadget Controller** and **GameEngine**. Leave the other **Global Fields** options at their default values.9. At the bottom of the page, select **Save**.

##Step 4: Create an Interaction Model
Continuing from the previous step, do the following:1. At the bottom of the page, select **Next**. Alternatively, you can select **Interaction Model** from the left-hand menu.2. In the **Intent Schema** box, paste the following JSON:

```
{
  "intents": [
    { 
      "intent": "AMAZON.CancelIntent"    },    {
      "intent": "AMAZON.HelpIntent"    },    {
      "intent": "AMAZON.StopIntent"    },    {
      "intent": "LaunchIntent"
    }
  ]}
```

  3\. Under the **Sample Utterances**, paste the following text:
   
   `LaunchIntent Open Hello Buttons`

  4\. At the bottom of the page, select **Save** and **Build**. The model might take a moment to build.


##Step 5: Configure the Skill
Continuing from the previous step, do the following:1. At the bottom of the page, select **Next**. Alternatively, you can select **Configuration** from the left-hand menu.
2. Under **Endpoint**, for **Service Endpoint Type**, select **AWS Lambda ARN (Amazon Resource Name)**.3. In the **Default** field, paste the ARN of the Lambda function that you created in an earlier step. Leave the other options at their default values.4. At the bottom of the page, select **Save**.


##Step 6: Add Publishing Information
Continuing from the previous step, do the following:
1. At the bottom of the page, select **Next** twice. Alternatively, you can select **Publishing Information** from the left-hand menu.
2. In the **Global Fields** section, provide the following information:
 * **Category** – Select **Games, Trivia and Accessories**.
 * **Subcategory** – Select **Games**.
 * **Testing Instructions** – Enter `Say 'Alexa, open Hello Buttons'.`
 * **Countries and Regions** – Select **In all countries and regions where Amazon distributes skills**.
 * **Echo Button Use** – Select **Required**.
 * **Number of Echo Buttons** – Select **4**.
 * **Number of Players** – For **Min**, select **1**. For **Max**, select **No Limit**.3. For **Short Skill Description** and **Full Skill Description**, enter `This is a sample skill for Echo Buttons.`4. For **Example Phrases**, enter `Alexa, open Hello Buttons.`
5. Select **Save**.


##Step 7: Add Privacy and Compliance InformationContinuing from the previous step, do the following:1. At the bottom of the page, select **Next**. Alternatively, you can select **Privacy & Compliance** from the left-hand menu.2. For **Does this skill allow users to make purchases or spend real money?**, select **No**.3. For **Does this Alexa skill collect users’ personal information?**, select **No**.4. For **Is this skill directed to or does it target children under the age of 13?**, select **No**.5. For **Export Compliance**, select the checkbox.6. For **Does this skill contain advertising?** select **No**.7. Select **Save**.

##Step 8: Enable the Skill in the Alexa AppYour Hello Buttons skill is in the development state and available for you to test with your Amazon Echo device and your Echo Buttons. First, you must ensure that the skill is enabled in the Alexa app. To check this, do the following:1. Go to the web version of the Alexa app ([alexa.amazon.com](alexa.amazon.com))ands ign in with your Amazon developer account.2. Choose **Skills** from the main menu.3. In the upper right, choose **Your Skills**.4. Using the search bar, search for the Hello Buttons skill. If you don’t find the skill, wait a few minutes and then try again.5. Select the skill. If the skill is already enabled, the button next to the skill name says **DISABLE SKILL**. In that case, you are finished with this step. If the button says **ENABLE**, then select that button.##Step 9: Invoke the SkillPair your Echo Buttons to your Amazon Echo device, and then invoke the skill by saying ***“Alexa, open Hello Buttons”***. The skill should run as described in the [skill flow](##Hello Buttons Skill Flow).

## License

This library is licensed under the Amazon Software License.
