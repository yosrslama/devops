// consumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'user-group' });

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Message reçu dans user-service : ${message.value.toString()}`);
      // Implémenter la logique pour traiter le message (par exemple, créer un utilisateur)
    },
  });
}

consumeMessages().catch(console.error);
