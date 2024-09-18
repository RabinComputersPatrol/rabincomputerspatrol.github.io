// Flutter imports:
import 'package:flutter/material.dart';

// Project imports:
import 'package:rabincomputerspatrol/services/api/issue_report.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  List<IssueReport> reports = [];
  bool isAscending = true;
  int sortColumnIndex = 0;

  @override
  void initState() {
    super.initState();
    getReports();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: Column(
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                DataTable(
                  sortColumnIndex: sortColumnIndex,
                  sortAscending: isAscending,
                  columns: [
                    const DataColumn(label: Text("Actions")),
                    DataColumn(
                        label: const Text("Phone Number"),
                        onSort: (columnIndex, ascending) => _onSort(columnIndex,
                            ascending, (report) => report.phoneNumber)),
                    DataColumn(
                      label: const Text('Reporter Name'),
                      onSort: (columnIndex, ascending) => _onSort(
                          columnIndex, ascending, (report) => report.name),
                    ),
                    DataColumn(
                      label: const Text('Room #'),
                      onSort: (columnIndex, ascending) => _onSort(columnIndex,
                          ascending, (report) => report.roomNumber),
                    ),
                    DataColumn(
                      label: const Text('Priority'),
                      onSort: (columnIndex, ascending) => _onSort(
                          columnIndex, ascending, (report) => report.priority),
                    ),
                    DataColumn(
                      label: const Text('Time'),
                      onSort: (columnIndex, ascending) => _onSort(
                          columnIndex, ascending, (report) => report.date),
                    ),
                    const DataColumn(label: Text('Description')),
                  ],
                  rows: reports.map((report) {
                    return DataRow(cells: [
                      DataCell(IconButton(
                        icon: const Icon(Icons.preview_outlined),
                        onPressed: () {
                          // TODO edit & view single report
                        },
                        tooltip: "View & Edit",
                      )),
                      DataCell((Text(report.phoneNumber))),
                      DataCell(Text(report.name)),
                      DataCell(Text(report.roomNumber.toString())),
                      DataCell(Text(report.priority.toString())),
                      DataCell(Text(report.date.toString().split(" ")[0])),
                      DataCell(Text(report.problemDescription)),
                    ]);
                  }).toList(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void getReports() async {
    List<Map<String, dynamic>> json =
        await DatabaseAPI.instance.getAllDocuments("reports");

    // Convert JSON to IssueReport objects
    final fetchedReports =
        json.map((reportJson) => IssueReport.fromJson(reportJson)).toList();

    // Update state
    setState(() {
      reports = fetchedReports;
    });
  }

  void _onSort<T>(int columnIndex, bool ascending,
      Comparable<T> Function(IssueReport report) getField) {
    reports.sort((a, b) {
      final aValue = getField(a);
      final bValue = getField(b);
      return ascending
          ? Comparable.compare(aValue, bValue)
          : Comparable.compare(bValue, aValue);
    });

    setState(() {
      sortColumnIndex = columnIndex;
      isAscending = ascending;
    });
  }
}