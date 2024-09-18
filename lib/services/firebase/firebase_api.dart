// Package imports:
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';

class DatabaseAPI {
  FirebaseApp? app;
  FirebaseFirestore? firestore;
  static final DatabaseAPI instance = DatabaseAPI();

  Future<void> initialize() async {
    app = await Firebase.initializeApp(
      options: const FirebaseOptions(
        apiKey: "AIzaSyBD5wyW9A1cTpErpWeS_5d_pHe3DufjXpY",
        appId: "1:458287013012:web:1c5550b31f5449c4a72881",
        messagingSenderId: "458287013012",
        projectId: "computerpatrol-5c961",
        storageBucket: "computerpatrol-5c961.appspot.com",
      ),
    );

    firestore = FirebaseFirestore.instanceFor(app: app!);
  }

  Future<List<Map<String, dynamic>>> getAllDocuments(
      String collectionPath) async {
    if (firestore == null) {
      throw Exception("Firebase not initialized");
    }

    try {
      QuerySnapshot querySnapshot =
          await firestore!.collection(collectionPath).get();
      List<Map<String, dynamic>> documents = querySnapshot.docs.map((doc) {
        return doc.data() as Map<String, dynamic>;
      }).toList();

      return documents;
    } on FirebaseException catch (_) {
      rethrow;
    }
  }

  Future<void> uploadJson(Map<String, dynamic> jsonData, String collectionPath,
      String documentId) async {
    if (firestore == null) {
      throw Exception("Firebase not initialized");
    }

    try {
      await firestore!.collection(collectionPath).doc(documentId).set(jsonData);
    } on FirebaseException catch (_) {
      rethrow;
    }
  }

  Future<(Map<String, dynamic>, bool)> downloadJson(
      String collectionPath, String documentId) async {
    if (firestore == null) {
      throw Exception("Firebase not initialized");
    }

    try {
      DocumentSnapshot docSnapshot =
          await firestore!.collection(collectionPath).doc(documentId).get();
      if (docSnapshot.exists) {
        return (docSnapshot.data() as Map<String, dynamic>, true);
      } else {
        Map<String, dynamic> map = {};
        return (map, false);
        // throw Exception("No data found at the specified document.");
      }
    } on FirebaseException catch (_) {
      rethrow;
    }
  }

  Future<void> deleteDocument(String collectionPath, String documentId) async {
    if (firestore == null) {
      throw Exception("Firebase not initialized");
    }

    await firestore?.collection(collectionPath).doc(documentId).delete();
  }
}
