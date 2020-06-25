import { APIGatewayProxyHandler,S3Handler } from 'aws-lambda';
import 'source-map-support/register';
import * as queryString from 'query-string';
import {Response} from 'node-fetch';
import {S3,TranscribeService} from 'aws-sdk';

async function transcribe(bucket:string, key: string){

  //const mediaUrl=`https://${bucket}.s3.amazonaws.com/${key}`
  const mediaUrl=`s3://${bucket}/${key}`
  console.log(`File URI use ${mediaUrl}`)

  const jobParams = {
    LanguageCode: 'en-US',
    Media: {
      MediaFileUri: mediaUrl
    },
    MediaFormat: 'wav',
    OutputBucketName: "jcc-media-out1972",
    Settings: {
      ChannelIdentification: true
    },
    TranscriptionJobName: `${key}.txt`
  }

  const transcribeService = new TranscribeService({apiVersion: '2017-10-26'});
  console.log("AA");
  
    try{
      console.log("BB");
      console.log(`API Versions : ${transcribeService}`);
      const result = await transcribeService.startTranscriptionJob(jobParams).promise();
      console.log(`Results: ${result.TranscriptionJob.TranscriptionJobName}`)
      console.log("cc");
    }  
    catch(e){
      console.log(e)
      console.log(`Error ${e}`);
    }
  
  console.log("C");

}

export const recordingTranscribeInit: S3Handler = async (event) =>{
   console.log(`Event received in S3: ${JSON.stringify(event)}`)
   
   event.Records.forEach(record => {
      const mediaBucket = record.s3.bucket.name;
      const mediaFile   = record.s3.object.key;

      console.log(`Received ${mediaFile} from bucket ${mediaBucket}`);
      transcribe(mediaBucket,mediaFile);
   });

  
}

export const recordCall: APIGatewayProxyHandler = async (_event, _context) => {
  const VoiceResponse = require('twilio').twiml.VoiceResponse;
  const vr = new VoiceResponse();
        
  vr.say('Please leave a message after the beep.');

   // Use <Record> to record the caller's message
  console.log(`The following recording callback is going to be used: ${process.env.RECORDING_CALLBACK_URL}`);
  vr.record({
    recordingStatusCallback: process.env.RECORDING_CALLBACK_URL,
    recordingStatusCallbackEvent: 'completed'
  });

  // End the call with <Hangup>
  vr.hangup();

  const myxml = vr.toString();

  return  {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
      body: myxml,
  };
}

export const recordingCallBack: APIGatewayProxyHandler = async (event, _context) => {
  const requestParams=queryString.parse(event.body);
  console.log(`The following URL is being return ${requestParams.RecordingUrl}`);
  const recordingURL = <string> requestParams.RecordingUrl;
  const recordingSid = <string> requestParams.RecordingSid;

  const fetch = require('node-fetch');
  const response:Response = await fetch(recordingURL)
  const bodyData = await response.buffer();
  
  if (response.ok){
    console.log("I have received an ok")
    const s3 = new S3();
    await s3.putObject({
      Bucket: 'jcc-media1972',
      Key: `media/${recordingSid}.wav`,
      Body: bodyData
    }, (err,data) =>{
      if (err){
        console.log(`Error has occurred: ${err}`);
      } else{
        console.log(`Done processing: ${data}`);
      }
    }).promise();
  } else{ 
    console.log("An error occurred")
  }

   //Can I stream the response write to s3
  //await response.data.pipe(await fs.createWriteStream(`/tmp/${recordingSid}.wav`))
  // const fileData = fs.readFileSync(`/tmp/${recordingSid}.wav`);
  console.info(`Callback event received in recordingCallback.  The file that is generated is ${recordingSid}`);
  

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Callback event received in recordingCallback ${JSON.stringify(event, null, 2)}`,
      input: event,
    }, null, 2),
  };
}
