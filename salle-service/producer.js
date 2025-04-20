const { Kafka } = require('kafkajs');

// Configuration Kafka
const kafka = new Kafka({
  clientId: 'salle-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

// Connexion unique au démarrage
const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('✅ Kafka Producer connecté');
  } catch (error) {
    console.error('❌ Erreur de connexion Kafka Producer:', error);
  }
};

// Appelle la connexion une seule fois au démarrage
connectProducer();

// Fonction pour envoyer un message dans un topic Kafka
const produceMessage = async (topic, message) => {
  if (!message || Object.keys(message).length === 0) {
    console.error(`❌ Message invalide pour le topic "${topic}" :`, message);
    return;
  }

  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`✅ Message envoyé sur "${topic}":`, message);
  } catch (err) {
    console.error('❌ Erreur envoi message Kafka:', err);
  }
};

module.exports = produceMessage;
