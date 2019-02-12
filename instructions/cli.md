# Build An Alexa Hello Buttons Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/gadgets/ECHO_BUTTONS_DEV_PORTAL_API_LAUNCH_BLOG_HERO_954x240_V1._TTH_.png" />

## Setup w/ ASK CLI

### About
This readme assumes you have your developer environment ready to go and that you have some familiarity with CLI (Command Line Interface) Tools, [AWS](https://aws.amazon.com/), and the [ASK Developer Portal](https://developer.amazon.com/alexa-skills-kit?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-buttons-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-buttons-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).
### Pre-requisites

* Node.js (> v8)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-buttons-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-buttons-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)
* Install and initialize the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-buttons-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-buttons-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)

> Note: If you would like to setup the ASK CLI using AWS Cloud9 (a cloud-based IDE with pay-as-you-go pricing and is eligible for AWS Free Tier pricing), step-by-step instructions can be found [here](https://alexa.design/cli-on-cloud9).

### Installation
1. **Make sure** you are running the latest version of the CLI

	```bash
	npm update -g ask-cli
	```

2. **Create** the skill based on the repository.

	```bash
	ask new --url https://github.com/alexa/skill-sample-nodejs-buttons-hellobuttons.git --skill-name hello-buttons
	```

### Deployment

ASK CLI **will create the skill and the Lambda function for you**. The Lambda function will be created in ```us-east-1 (Northern Virginia)``` by default.

1. Navigate to the project's root directory. you should see a file named 'skill.json' there.
2. Deploy the skill and the Lambda function in one step by running the following command:

	```bash
	ask deploy
	```

### Testing

1. To test, the skill needs to be enabled.  From the developer console, open your skill and click the Test tab.  Ensure the skill is available for testing in Development.

2. Simulate verbal interaction with your skill through the command line (this might take a few moments) using the following example:

	```bash
	 ask simulate -l en-US -t "start Hello Buttons"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

## Additional Testing Options
[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_testing._TTH_.png)](./test-using-simulator.md)


