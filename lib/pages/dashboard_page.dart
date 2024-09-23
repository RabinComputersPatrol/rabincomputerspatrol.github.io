// Flutter imports:
import 'package:flutter/material.dart';
// Project imports:
import 'package:rabincomputerspatrol/pages/report_page.dart';
import 'package:rabincomputerspatrol/services/api/issue_report.dart';
import 'package:rabincomputerspatrol/services/api/verify_session.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dashboard_delete_user_dialog.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dashboard_logout.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dashboard_new_user_dialog.dart';
import 'package:shared_preferences/shared_preferences.dart';

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

  Future<User> getUser() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    String? name = prefs.getString('name');
    String? password = prefs.getString('password');
    int? permission = prefs.getInt('permission');

    if (name == null || password == null || permission == null) {
      throw Exception("Missing user data");
    }

    User user = User(name, password, permission);
    return user;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: FutureBuilder<User>(
        future: getUser(), // Fetch the user asynchronously
        builder: (BuildContext context, AsyncSnapshot<User> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            User user = snapshot.data!;

            return Center(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    DataTable(
                      sortColumnIndex: sortColumnIndex,
                      sortAscending: isAscending,
                      columns: [
                        const DataColumn(label: Text("Actions")),
                        DataColumn(
                            label: const Text("Phone Number"),
                            onSort: (columnIndex, ascending) =>
                                _onSort(columnIndex, ascending, (report) => report.phoneNumber)),
                        DataColumn(
                          label: const Text('Reporter Name'),
                          onSort: (columnIndex, ascending) =>
                              _onSort(columnIndex, ascending, (report) => report.name),
                        ),
                        DataColumn(
                          label: const Text('Room #'),
                          onSort: (columnIndex, ascending) =>
                              _onSort(columnIndex, ascending, (report) => report.roomNumber),
                        ),
                        DataColumn(
                          label: const Text('Priority'),
                          onSort: (columnIndex, ascending) =>
                              _onSort(columnIndex, ascending, (report) => report.priority),
                        ),
                        DataColumn(
                          label: const Text('Date'),
                          onSort: (columnIndex, ascending) =>
                              _onSort(columnIndex, ascending, (report) => report.date),
                        ),
                        const DataColumn(label: Text('Description')),
                      ],
                      rows: reports.map((report) {
                        return DataRow(cells: [
                          DataCell(IconButton(
                            icon: const Icon(Icons.preview_outlined),
                            onPressed: () {
                              showDialog(
                                context: context,
                                builder: (context) => ReportPage(
                                  report: report,
                                  dashboardCallback: () {
                                    setState(() {
                                      getReports();
                                    });
                                  },
                                ),
                              );
                            },
                            tooltip: "View & Edit",
                          )),
                          DataCell((Text(report.phoneNumber))),
                          DataCell(Text(report.name)),
                          DataCell(Text(report.roomNumber.toString())),
                          DataCell(Text(report.priority.toString())),
                          DataCell(
                            Tooltip(
                              message: report.time,
                              child: Text(report.date.toString().split(" ")[0]),
                            ),
                          ),
                          DataCell(
                            Text(
                              report.problemDescription,
                              textDirection: TextDirection.rtl,
                            ),
                          ),
                        ]);
                      }).toList(),
                    ),
                  ],
                ),
              ),
            );
          } else {
            return Center(child: Text('No user data available.'));
          }
        },
      ),
      floatingActionButton: FutureBuilder<User>(
        future: getUser(),
        builder: (BuildContext context, AsyncSnapshot<User> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container();
          } else if (snapshot.hasData) {
            User user = snapshot.data!;
            return Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                if (user.permission == 5) ...[
                  FloatingActionButton(
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return const DashboardAddUserDialog();
                        },
                      );
                    },
                    tooltip: "Add User",
                    child: const Icon(Icons.add),
                  ),
                  const SizedBox(height: 5),
                  FloatingActionButton(
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return const DashboardDeleteUserDialog();
                        },
                      );
                    },
                    tooltip: "Remove User",
                    child: const Icon(Icons.remove),
                  ),
                ],
                const SizedBox(height: 5),
                const DashboardLogout(),
              ],
            );
          } else {
            return Container();
          }
        },
      ),
    );
  }



  void getReports() async {
    List<Map<String, dynamic>> json =
        await DatabaseAPI.instance.getAllDocuments("reports");

    final fetchedReports =
        json.map((reportJson) => IssueReport.fromJson(reportJson)).toList();

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
