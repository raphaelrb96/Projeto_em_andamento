const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = admin.initializeApp();
const db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


//pegar os dados do pedido do usuario, mandar para central de pedidos, e esvaziar a lista de compras do user
exports.pedidosRecept = functions.firestore.document('pedidosWeb/{uid}').onWrite((change, context) => {      
      //document data
      if (change.after.exists) {
	      const newDocument = change.after.data();

	      const uid = newDocument.uid;

	      let batchUp = db.batch();
	      let batchDel = db.batch();

	      return db.collection('carComprasActivy')
					.doc('usuario')
					.collection(uid)
					.get()
					.then(snap => {


						for(let i = 0; i < snap.size; i++) {
							let objec = snap.docs[i];
							batchUp.set(db.collection('pedidosWeb').doc(uid).collection('listaProdutos').doc(objec.get('idProdut')), objec.data());
							batchDel.delete(objec.ref);
						}

						return batchUp.commit().then(() => {
							return batchDel.commit().then(() => {
								return console.log('Tudo certo');
							}).catch(erro => {
								return console.log(erro);
							});
						}).catch(erro => {
							return console.log(erro);
						});

					}).catch(erro => {
						return console.log(erro);
					});

	  } else {
	  	return console.log('Exclusao ou Venda concluida');
	  }

    });
