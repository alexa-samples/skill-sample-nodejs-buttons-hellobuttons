![](https://images-na.ssl-images-amazon.com/images/G/01/kindle/dp/2017/4911315144/LP_AG_HERO_BANNER_1334x389.jpg)

## Hello Buttons Skill

**Important: The Gadgets Skill API is in beta and is subject to change at any time without notice. We welcome your feedback.**


These instructions show how to create a simple skill called Hello Buttons. This skill demonstrates how to send directives to, and receive events from, [Echo Buttons](https://www.amazon.com/Echo-Buttons-Alexa-Gadget-Pack/dp/B072C4KCQH).

**Note:** Hello Buttons demonstrates how to use the Gadget interfaces ([GameEngine](https://developer.amazon.com/docs/gadget-skills/gameengine-interface-reference.html) and [GadgetController](https://developer.amazon.com/docs/gadget-skills/gadgetcontroller-interface-reference.html)). It is not intended to be a comprehensive example. For an end-to-end skill, please refer to the [Color Changer sample](https://github.com/alexa/skill-sample-nodejs-buttons-colorchanger).

This sample skill uses:

* The [developer portal](https://developer.amazon.com/home.html) to configure the skill and specify the interaction model
* Code written in [Node.js](https://nodejs.org/en/) javascript, and using the [Alexa Skills Kit (ASK) SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) library.

## Hello Buttons Skill Flow
When the Hello Buttons skill begins, it will send [animation directives](https://developer.amazon.com/docs/gadget-skills/control-echo-buttons.html#animate) for the three possible trigger events (`buttonDown`, `buttonUp` and `none`) to all the Echo Buttons. Alexa will then ask you to press the buttons, and an audio file will play.

When you press a button, the skill will interrupt Alexa's speech. If the button that you pressed is not awake, the skill will initialize the button by sending animation directives for `buttonDown`, `buttonUp` and `none` to that button. This is different from the original `LaunchRequest` intent, which sent initialization directives to all buttons.

If the pressed button wakes up, you will see a different color on `buttonDown` and `buttonUp` events, as well as a breathing animation for the `none` event. If you cancel the skill (for example, by saying "Alexa, cancel") or the Input Handler expires, the buttons will fade from white to black.

## Preparation
Before you create the Hello Buttons skill, you must take the following steps:

* **Create an Amazon developer account** If you don't already have an Amazon developer account, go to the [developer portal](https://developer.amazon.com/alexa/console/ask#/) and select **Sign In** in the upper right to create a free account.

## Recommended
* **Get Echo Buttons** This skill works best with two [Echo Buttons](https://www.amazon.com/Echo-Buttons-Alexa-Gadget-Pack/dp/B072C4KCQH/), but you can also test using simulated buttons that will appear in the developer console.

## Optional
*  [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
*  [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
*  [Node.JS version 8+](https://nodejs.org/)

## Skill Architecture
Each skill consists of two basic parts, a front end and a back end.
The front end is the voice interface, or VUI.
The voice interface is configured through the voice interaction model.
The back end is where the logic of your skill resides.

## Three Options for Skill Setup
There are a number of different ways for you to setup your skill, depending on your experience and what tools you have available.

 * If this is your first skill, try the [Alexa-Hosted backend instructions](./instructions/setup-vui-alexa-hosted.md) to get started quickly.
 * If you want to build a "classic" Alexa skill, and manage the backend resources in your own AWS account, you can follow the [AWS-Hosted instructions](./instructions/setup-vui-aws-hosted.md).
 * Developers with the [ASK Command Line Interface](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) configured may build the Alexa Hello Buttons skill from the command-line [instructions](./instructions/cli.md).

---

## Additional Resources

### Community
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/165/index.html) - Join the conversation!
* [Hackster.io](https://www.hackster.io/amazon-alexa) - See what others are building with Alexa.

### Tutorials & Guides
* [Voice Design Guide](https://developer.amazon.com/designing-for-voice/) - A great resource for learning conversational and voice user interface design.
* [Codecademy: Learn Alexa](https://www.codecademy.com/learn/learn-alexa) - Learn how to build an Alexa Skill from within your browser with this beginner friendly tutorial on Codecademy!

### Documentation
* [Official Alexa Skills Kit SDK for Node.js](http://alexa.design/node-sdk-docs) - The Official Node.js SDK Documentation
* [Official Alexa Skills Kit Documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Official Alexa Skills Kit Documentation

