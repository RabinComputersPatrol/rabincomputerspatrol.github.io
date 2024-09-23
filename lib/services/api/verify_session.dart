import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:collection/collection.dart';
import 'package:flutter/material.dart';

class VerifySession {
  Future<bool> verifySession(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? name = prefs.getString('name');
    String? password = prefs.getString('password');

    if (name == null || password == null) {
      return false;
    }

    try {
      List<Map<String, dynamic>> users = await DatabaseAPI.instance
          .getAllDocuments("users");

      Map<String, dynamic>? user = users.firstWhereOrNull(
            (user) => user["name"] == name && user["password"] == password,
      );

      if (user != null) {
        return true;
      } else {
        Navigator.of(context).pop();
        return false;
      }
    } catch (e) {
      print('Error verifying session: $e');
      return false;
    }
  }
}

class User {
  final String? _name;
  final String? _hashedPassword;
  final int? _permission;

  User(String? name, String? password, int? permission)
      : _name = name,
        _hashedPassword = _hashPassword(password),
        _permission = permission;

  String? get name => _name;
  int? get permission => _permission;

  bool checkPassword(String? password) {
    return _hashedPassword == _hashPassword(password);
  }

  static String? _hashPassword(String? password) {
    var bytes = utf8.encode(password!);
    var digest = sha256.convert(bytes);
    return digest.toString();
  }
}