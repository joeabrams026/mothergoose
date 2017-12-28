/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            FACTS: [
                `Baa, baa, black sheep
                Have you any wool?
                Yes sir, yes sir, three bags full.
                One for the master,
                And one for the dame,
                And one for the little boy
                Who lives down the lane.`,

                `Hey, diddle, diddle,
                The cat and the fiddle,
                The cow jumped over the moon;
                The little dog laughed
                To see such sport,
                And the dish ran away with the spoon.`,

                `Hickory, dickory, dock,
                The mouse ran up the clock;
                The clock struck one,
                And down he run,
                Hickory, dickory, dock.`,

                `Hot-cross buns!
                Hot-cross buns!
                One a penny, two a penny,
                Hot-cross buns!
                If you have no daughters,
                Give them to your sons;
                One a penny, two a penny,
                Hot-cross buns!`,

                `Jack be nimble,
                Jack be quick,
                Jack jump over
                The candlestick.`,

                `Jack and Jill went up the hill
                To fetch a pail of water;
                Jack fell down and broke his crown,
                and Jill came tumbling after.

                Up Jack got, and home did trot,
                As fast as he could caper,
                To old Dame Dob, who patched his nob
                With vinegar and brown paper.`,

                `Pat-a-cake, pat-a-cake, baker's man,
                Bake me a cake, as fast as you can;
                Pat it, prick it, and mark it with B,
                Put it in the oven for baby and me.`
            ],
            SKILL_NAME: 'Mother goose facts',
            GET_FACT_MESSAGE: "Time for a rhyme: ",
            HELP_MESSAGE: 'You can say tell me a rhyme, or, you can say exit...',
            HELP_REPROMPT: 'Say rhyme or exit?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
