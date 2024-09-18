// Flutter imports:
import 'package:flutter/material.dart';

class Priority {
  String name;
  int value;
  Color? color;

  Priority({
    required this.name,
    required this.value,
    this.color = Colors.black,
  });
}

abstract class Priorities {
  static Priority nonErgent = Priority(name: "לא דחוף", value: 1);
  static Priority normal =
      Priority(name: "רגיל", value: 2, color: Colors.blueAccent);
  static Priority important =
      Priority(name: "חשוב", value: 3, color: Colors.redAccent.shade100);
  static Priority ergent =
      Priority(name: "דחוף", value: 4, color: Colors.redAccent.shade200);
  static Priority veryErgent =
      Priority(name: "מאוד דחוף", value: 5, color: Colors.redAccent.shade400);
}
