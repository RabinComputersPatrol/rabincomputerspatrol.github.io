// Flutter imports:
import 'package:flutter/material.dart';

import 'package:rabincomputerspatrol/services/theme.dart'; // Ensure this import is valid in your project

class Priority {
  final String name;
  final int value;
  final Color color;

  Priority({
    required this.name,
    required this.value,
    Color? color,
  }) : color = color ?? getPriorityColor(value, GlobalTheme());

  static Color getPriorityColor(int priorityValue, GlobalTheme theme) {
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
        return theme.textColor;
    }
  }
}

class Priorities {
  static final Priority nonUrgent = Priority(name: "לא דחוף", value: 1);
  static final Priority normal = Priority(name: "רגיל", value: 2);
  static final Priority important = Priority(name: "חשוב", value: 3);
  static final Priority urgent = Priority(name: "דחוף", value: 4);
  static final Priority veryUrgent = Priority(name: "מאוד דחוף", value: 5);
}
