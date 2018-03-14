/**
    Copyright 2018 Amazon.com, Inc. and its affiliates. All Rights Reserved.
    Licensed under the Amazon Software License (the "License").
    You may not use this file except in compliance with the License.
    A copy of the License is located at
      http://aws.amazon.com/asl/
    or in the "license" file accompanying this file. This file is distributed
    on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express 
    or implied. See the License for the specific language governing
    permissions and limitations under the License.

    Hello World buttons skill opens with buttons roll call and asks the user to
    push two buttons. On button one press, she changes the color to red and on
    button two press she changes the color to blue. Then closes. This skill
    demonstrates how to send directives to, and receive events from, Echo Buttons.
 **/


 'use strict';

 const Alexa = require('alexa-sdk');

 exports.handler = (event, context) => {
   // Standard Alexa Skills Kit initialization.
   const alexa = Alexa.handler(event, context);
   alexa.appId = '';
   alexa.registerHandlers(main);
   alexa.execute();
 };

 const main = {
   'LaunchRequest': function() {
     console.log('LaunchRequest');

     /*
       On launch, this skill will immediately set up the
       Input Handler to listen to all attached buttons for 30
       seconds.
       The skill will then set up two events that each report when
       buttons are pressed and when they're released.
       After 30 seconds, the skill will receive the timeout event.
     */
     this.response._addDirective({
       "type": "GameEngine.StartInputHandler",
       "timeout": 30000,
       "recognizers": {
         "button_down_recognizer": {
           type: "match",
           fuzzy: false,
           anchor: "end",
           "pattern": [{
             "action": "down"
           }]
         },
         "button_up_recognizer": {
           type: "match",
           fuzzy: false,
           anchor: "end",
           "pattern": [{
             "action": "up"
           }]
         }
       },
       "events": {
         "button_down_event": {
           "meets": ["button_down_recognizer"],
           "reports": "matches",
           "shouldEndInputHandler": false
         },
         "button_up_event": {
           "meets": ["button_up_recognizer"],
           "reports": "matches",
           "shouldEndInputHandler": false
         },
         "timeout": {
           "meets": ["timed out"],
           "reports": "history",
           "shouldEndInputHandler": true
         }
       }
     });

    // Preserve the originatingRequestId that will be used to stop the Input Handler later.
    this.attributes.inputHandler_originatingRequestId = this.event.request.requestId;

     /*
       If the buttons are awake before the skill starts, the skill can send
       animations to all of the buttons by targeting the empty array [].
     */

     // Start keeping track of some state.
     this.attributes.buttonCount = 0;

     // Build the breathing animation that will play immediately.
     this.response._addDirective(buildButtonIdleAnimationDirective([], breathAnimationRed));

     // Build the 'button down' animation for when the button is pressed.
     this.response._addDirective(buildButtonDownAnimationDirective([]));

     // Build the 'button up' animation for when the button is released.
     this.response._addDirective(buildButtonUpAnimationDirective([]));

     // Have Alexa say something in the standard way.
     this.response.speak("Welcome to the Hello Buttons skill. Press your Echo Buttons to change "
      + "the colors of the lights. I'll keep talking so that you can interrupt me. Lorem ipsum "
      + "dolor sit ahmet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
      + "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
      + "ullamco laboris nisi ut aliquip ex ea commodo consequat.");

     // Deleting `shouldEndSession` will keep the session open, but NOT open the microphone.
     // You could also set `shouldEndSession` to false if you also wanted a voice intent.
     // Never set `shouldEndSession` to true if you're expecting
     // Input Handler events -- you'll lose the session!
     delete this.handler.response.response.shouldEndSession;

     // We'll use the manual mechanism to end the response, because we've modified the response directly.
     this.emit(':responseReady');
   },
   'GameEngine.InputHandlerEvent': function() {
     console.log('Received game event', JSON.stringify(this.event, null, 2));

     let gameEngineEvents = this.event.request.events || [];
     for (let i = 0; i < gameEngineEvents.length; i++) {

       let buttonId;

       // In this request type, we'll see one or more incoming events
       // that correspond to the StartInputHandler directive we sent above.
       switch (gameEngineEvents[i].name) {
         case 'button_down_event':

           // ID of the button that triggered the event.
           buttonId = gameEngineEvents[i].inputEvents[0].gadgetId;

           // Recognize a new button.
           let isNewButton = false;
           if (this.attributes[buttonId + '_initialized'] === undefined) {
             isNewButton = true;
             this.attributes.buttonCount += 1;
             /*
               This is a new button, as in new to our understanding.
               Because this button may have just woken up, it may not
               have received the initial animations during the launch intent.
               We'll resend the animations here, but instead of the empty array
               broadcast above, we'll send the animations ONLY to this buttonId.
             */
             this.response._addDirective(buildButtonIdleAnimationDirective([buttonId], breathAnimationRed));
             this.response._addDirective(buildButtonDownAnimationDirective([buttonId]));
             this.response._addDirective(buildButtonUpAnimationDirective([buttonId]));

             this.attributes[buttonId + '_initialized'] = true;
           }

           // Again, this means don't end the session, and don't open the microphone.
           delete this.handler.response.response.shouldEndSession;

           if (isNewButton) {
             // Say something when we first encounter a button.
             this.response.speak('hello, button ' + this.attributes.buttonCount);

             /*
              This setting has no effect because Echo Buttons currently always interrupt
              text-to-speech, but this setting may be used to control this behavior in the
              future. If your skill depends on Echo Buttons interrupting text-to-speech,
              leave this in.
             */
             this.handler.response.response.outputSpeech.playBehavior = 'REPLACE_ALL';
           }

           // Once more, we finish with this because we directly manipulated the response.
           this.emit(':responseReady');

           break;

         case 'button_up_event':

           buttonId = gameEngineEvents[i].inputEvents[0].gadgetId;

           /*
             On releasing the button, we'll replace the 'none' animation
             with a new color from a set of animations.
           */
           let newAnimationIndex = ((attributes, buttonId, maxLength) => {
             let index = 1;

             if (attributes[buttonId] !== undefined) {
               let newValue = attributes[buttonId] + 1;
               if (newValue >= maxLength) {
                 newValue = 0;
              }
               index = newValue;
             }

             attributes[buttonId] = index;

             return index;
           })(this.attributes, buttonId, animations.length);

           let newAnimation = animations[newAnimationIndex];

           this.response._addDirective(buildButtonIdleAnimationDirective([buttonId], newAnimation));

           delete this.handler.response.response.shouldEndSession;

           this.emit(':responseReady');

           break;

         case 'timeout':

           this.response.speak("Thank you for playing!");

           this.response._addDirective(buttonFadeoutAnimationDirective);
           this.response._addDirective(buttonDefaultButtonUpAnimationDirective);
           this.response._addDirective(buttonDefaultButtonDownAnimationDirective);

           /*
             Now that we're done, we want to end the session and clean up.
           */
           this.handler.response.response.shouldEndSession = true;

           this.emit(':responseReady');

           break;
       }
     }
   },
   /*
     Standard skill intent handling.
   */
   'AMAZON.HelpIntent': function() {
     console.log('HelpIntent');
     const msg = 'Welcome to the Hello Buttons skill. Press your Echo Buttons.';
     this.emit(':tell', msg, msg);
   },
   'AMAZON.StopIntent': function() {
     console.log('StopIntent');
     this.response.speak('Goodbye!');

     this.response._addDirective(buttonFadeoutAnimationDirective);
     this.response._addDirective(buttonDefaultButtonUpAnimationDirective);
     this.response._addDirective(buttonDefaultButtonDownAnimationDirective);
     if (this.attributes.inputHandler_originatingRequestId !== undefined) {
       this.response._addDirective(buttonStopIntpuHandlerDirective(this.attributes.inputHandler_originatingRequestId));
     }

     this.emit(':responseReady');
   },
   'AMAZON.CancelIntent': function() {
     console.log('CancelIntent');
     this.response.speak('All right. Cancelling.');

     this.response._addDirective(buttonFadeoutAnimationDirective);
     this.response._addDirective(buttonDefaultButtonUpAnimationDirective);
     this.response._addDirective(buttonDefaultButtonDownAnimationDirective);
     if (this.attributes.inputHandler_originatingRequestId !== undefined) {
       this.response._addDirective(buttonStopIntpuHandlerDirective(this.attributes.inputHandler_originatingRequestId));
     }

     this.emit(':responseReady');
   },
   'SessionEndedRequest': function() {
     console.log('SessionEndedRequest');
   },
   'System.ExceptionEncountered': function() {
     console.log('ExceptionEncountered');
     console.log(this.event.request.error);
     console.log(this.event.request.cause);
   },
   'Unhandled': function() {
     console.log('Unhandled');
     const msg = "Sorry, I didn't get that.";
     this.emit(':ask', msg, msg);
   }
 };

 /*
   The following are animation generation functions that work
   with the hexadecimal format that SetLight expects.
 */

 const buildBreathAnimation = function(fromRgbHex, toRgbHex, steps, totalDuration) {
   const halfSteps = steps / 2;
   const halfTotalDuration = totalDuration / 2;
   return buildSeqentialAnimation(fromRgbHex, toRgbHex, halfSteps, halfTotalDuration)
     .concat(buildSeqentialAnimation(toRgbHex, fromRgbHex, halfSteps, halfTotalDuration));
 }

 const buildSeqentialAnimation = function(fromRgbHex, toRgbHex, steps, totalDuration) {
   const fromRgb = parseInt(fromRgbHex, 16);
   let fromRed = fromRgb >> 16;
   let fromGreen = (fromRgb & 0xff00) >> 8;
   let fromBlue = fromRgb & 0xff;

   const toRgb = parseInt(toRgbHex, 16);
   const toRed = toRgb >> 16;
   const toGreen = (toRgb & 0xff00) >> 8;
   const toBlue = toRgb & 0xff;

   const deltaRed = (toRed - fromRed) / steps;
   const deltaGreen = (toGreen - fromGreen) / steps;
   const deltaBlue = (toBlue - fromBlue) / steps;

   const oneStepDuration = Math.floor(totalDuration / steps);

   const result = [];

   for (let i = 0; i < steps; i++) {
     result.push({
       "durationMs": oneStepDuration,
       "color": rgb2h(fromRed, fromGreen, fromBlue),
       "blend": true
     });
     fromRed += deltaRed;
     fromGreen += deltaGreen;
     fromBlue += deltaBlue;
   }

   return result;
 }

 const rgb2h = function(r, g, b) {
   return '' + n2h(r) + n2h(g) + n2h(b);
 }
 // Number to hex with leading zeros.
 const n2h = function(n) {
   return ('00' + (Math.floor(n)).toString(16)).substr(-2);
 }

 const breathAnimationRed = buildBreathAnimation('552200', 'ff0000', 30, 1200);
 const breathAnimationGreen = buildBreathAnimation('004411', '00ff00', 30, 1200);
 const breathAnimationBlue = buildBreathAnimation('003366', '0000ff', 30, 1200);
 const animations = [breathAnimationRed, breathAnimationGreen, breathAnimationBlue];

 // Build a 'button down' animation directive.
 // The animation will overwrite the default 'button down' animation.
 const buildButtonDownAnimationDirective = function(targetGadgets) {
   return {
     "type": "GadgetController.SetLight",
     "version": 1,
     "targetGadgets": targetGadgets,
     "parameters": {
       "animations": [{
         "repeat": 1,
         "targetLights": ["1"],
         "sequence": [{
           "durationMs": 300,
           "color": "FFFF00",
           "blend": false
         }]
       }],
       "triggerEvent": "buttonDown",
       "triggerEventTimeMs": 0
     }
   }
 };

 // Build a 'button up' animation directive.
 const buildButtonUpAnimationDirective = function(targetGadgets) {
   return {
     "type": "GadgetController.SetLight",
     "version": 1,
     "targetGadgets": targetGadgets,
     "parameters": {
       "animations": [{
         "repeat": 1,
         "targetLights": ["1"],
         "sequence": [{
           "durationMs": 300,
           "color": "00FFFF",
           "blend": false
         }]
       }],
       "triggerEvent": "buttonUp",
       "triggerEventTimeMs": 0
     }
   }
 };

 // Build an idle animation directive.
 const buildButtonIdleAnimationDirective = function(targetGadgets, animation) {
   return {
     "type": "GadgetController.SetLight",
     "version": 1,
     "targetGadgets": targetGadgets,
     "parameters": {
       "animations": [{
         "repeat": 100,
         "targetLights": ["1"],
         "sequence": animation
       }],
       "triggerEvent": "none",
       "triggerEventTimeMs": 0
     }
   }
 };

 // Build a fade-out animation directive.
 const buttonFadeoutAnimationDirective = {
   "type": "GadgetController.SetLight",
   "version": 1,
   "targetGadgets": [],
   "parameters": {
     "animations": [{
       "repeat": 1,
       "targetLights": ["1"],
       "sequence": [{
         "durationMs": 1,
         "color": "FFFFFF",
         "blend": true
       }, {
         "durationMs": 1000,
         "color": "000000",
         "blend": true
       }]
     }],
     "triggerEvent": "none",
     "triggerEventTimeMs": 0
   }
 };

 // Call before exiting the skill.
 const buttonDefaultButtonUpAnimationDirective = {
   "type": "GadgetController.SetLight",
   "version": 1,
   "targetGadgets": [],
   "parameters": {
     "triggerEvent": "buttonUp",
     "triggerEventTimeMs": 0,
     "animations": [{
         "repeat": 1,
         "targetLights": ["1"],
         "sequence": [{
             "durationMs": 100,
             "color": "000000",
             "blend": false
         }]
     }]
   }
 };

 // Call before exiting the skill.
 const buttonDefaultButtonDownAnimationDirective = {
   "type": "GadgetController.SetLight",
   "version": 1,
   "targetGadgets": [],
   "parameters": {
     "triggerEvent": "buttonDown",
     "triggerEventTimeMs": 0,
     "animations": [{
       "repeat": 1,
       "targetLights": ["1"],
       "sequence": [{
         "durationMs": 200,
         "color": "0000FF",
         "blend": false
       }, {
         "durationMs": 500,
         "color": "000000",
         "blend": true
       }]
     }]
   }
 };

 // Call before exiting the skill if an Input Handler is active.
 const buttonStopIntpuHandlerDirective = function(inputHandlerOriginatingRequestId) {
   return {
     "type": "GameEngine.StopInputHandler",
     "originatingRequestId": inputHandlerOriginatingRequestId
   }
 };