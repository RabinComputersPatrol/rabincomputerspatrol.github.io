// Package imports:
import 'package:intl/intl.dart';

class IssueReport {
  final DateTime date;
  final bool fixed;
  final String name;
  final String phoneNumber;
  final String problemDescription;
  final int priority;
  final int roomNumber;

  IssueReport({
    required this.date,
    required this.fixed,
    required this.name,
    required this.phoneNumber,
    required this.problemDescription,
    required this.priority,
    required this.roomNumber,
  });

  factory IssueReport.fromJson(Map<String, dynamic> json) {
    final DateFormat dateFormat = DateFormat('dd/MM/yyyy');

    return IssueReport(
      date:
          dateFormat.parse(json['date']), // Parsing date in 'dd/MM/yyyy' format
      fixed: json['fixed'] == 1 ? true : false,
      name: json['name'],
      phoneNumber: json['phoneNumber'],
      problemDescription: json['problemDescription'],
      priority: json['priority'],
      roomNumber: json['roomNumber'],
    );
  }
}
