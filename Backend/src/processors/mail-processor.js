import mailer from '../config/mail-config.js';
import mailQueue from '../queues/mail-queue.js';

mailQueue.process(async (job) => {
  const emailData = job.data;
  console.log('processing email', emailData);

  try {
    const response = await mailer.sendMail(emailData);
    console.log('Email sent', response);
  } catch (error) {
    console.log('Error while processing email', error);
  }
});
