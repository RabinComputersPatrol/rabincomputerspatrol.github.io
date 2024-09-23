// Package imports:
import 'package:intl/intl.dart';

class IssueReport {
  final DateTime date;
  final String time;
  double status;
  final String name;
  final String phoneNumber;
  final String problemDescription;
  final int priority;
  final int roomNumber;

  IssueReport({
    required this.time,
    required this.date,
    required this.status,
    required this.name,
    required this.phoneNumber,
    required this.problemDescription,
    required this.priority,
    required this.roomNumber,
  });

  factory IssueReport.fromJson(Map<String, dynamic> json) {
    final DateFormat dateFormat = DateFormat('dd/MM/yyyy');

    return IssueReport(
      time: json['time'] ?? "00:00",
      date: dateFormat.parse(json['date']),
      status: json['fixed'],
      name: json['name'],
      phoneNumber: json['phoneNumber'],
      problemDescription: json['problemDescription'],
      priority: json['priority'] ?? 1,
      roomNumber: json['roomNumber'],
    );
  }

  Map<String, dynamic> toJson() {
    final DateFormat dateFormat = DateFormat('dd/MM/yyyy');
    return {
      'time': time,
      'date': dateFormat.format(date), // Format the date to 'dd/MM/yyyy'
      'fixed': status, // Store boolean as 1 or 0s
      'name': name,
      'phoneNumber': phoneNumber,
      'problemDescription': problemDescription,
      'priority': priority,
      'roomNumber': roomNumber,
    };
  }

  String generateDocumentId() {
    return "${roomNumber}_${time}_${date.year}:${date.month}:${date.day}";
  }
}
