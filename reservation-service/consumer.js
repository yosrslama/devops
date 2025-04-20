// consumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'reservation-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'reservation-group' });

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📩 Message reçu dans reservation-service : ${message.value.toString()}`);
      // Traitement du message ici
    },
  });
}

consumeMessages().catch(console.error);
