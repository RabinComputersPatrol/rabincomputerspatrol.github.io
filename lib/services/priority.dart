// Flutter imports:
import 'package:flutter/material.dart';

// Project imports:
import 'package:rabincomputerspatrol/services/theme.dart';

class Priority {
  String name;
  int value;
  Color? color;

  Priority({
    required this.name,
    required this.value,
    this.color,
  }) {
    color ??= getPriorityColor(value);
  }

  static Color getPriorityColor(int priorityValue) {
    switch (priorityValue) {
      case 2:
        return Colors.blueAccent;
      case 3:
        return Colors.redAccent.shade100;
      case 4:
        return Colors.redAccent.shade200;
      case 5:
        return Colors.redAccent.shade400;
      default:
        return GlobalTheme.textColor;
    }
  }
}

abstract class Priorities {
  static Priority nonErgent = Priority(name: "לא דחוף", value: 1);
  static Priority normal = Priority(name: "רגיל", value: 2);
  static Priority important = Priority(name: "חשוב", value: 3);
  static Priority ergent = Priority(name: "דחוף", value: 4);
  static Priority veryErgent = Priority(name: "מאוד דחוף", value: 5);
}
