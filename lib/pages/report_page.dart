// Flutter imports:
import 'package:flutter/material.dart';

// Package imports:
import 'package:url_launcher/url_launcher.dart';

// Project imports:
import 'package:rabincomputerspatrol/services/api/issue_report.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/services/priority.dart';
import 'package:rabincomputerspatrol/services/theme.dart';

class ReportPage extends StatefulWidget {
  final IssueReport report;
  final Function dashboardCallback;

  const ReportPage(
      {super.key, required this.report, required this.dashboardCallback});

  @override
  State<ReportPage> createState() => _ReportPageState();
}

class _ReportPageState extends State<ReportPage> {
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      content: SizedBox(
        width: 500,
        height: 500,
        child: Column(
          children: [
            Text(
              "@ Room #${widget.report.roomNumber}",
              style: const TextStyle(fontWeight: FontWeight.bold),
              textScaler: const TextScaler.linear(1.5),
            ),
            const Divider(),
            Text(
              widget.report.problemDescription,
              textScaler: const TextScaler.linear(1.1),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Reported by: ${widget.report.name}",
                  textScaler: const TextScaler.linear(1),
                ),
                const SizedBox(width: 15),
                const Icon(Icons.call_outlined),
                TextButton(
                  child: Text(widget.report.phoneNumber),
                  onPressed: () async {
                    Uri url = Uri(
                      scheme: "tel",
                      path: widget.report.phoneNumber.replaceAll("-", ""),
                    );

                    if (await canLaunchUrl(url)) {
                      await launchUrl(url);
                    }
                  },
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text("Reported At: ${widget.report.time}"),
            const SizedBox(height: 15),
            Container(
              padding: const EdgeInsets.only(left: 5, right: 5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: Priority.getPriorityColor(
                    widget.report.priority, GlobalTheme()),
              ),
              child: (Text(
                "Priority: ${widget.report.priority}",
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              )),
            ),
            const SizedBox(height: 10),
            SizedBox(
              height: 50,
              width: 200,
              child: Center(
                child: DropdownMenu<double>(
                  dropdownMenuEntries: const [
                    DropdownMenuEntry(value: 0, label: "Not Fixed"),
                    DropdownMenuEntry(value: 0.5, label: "In Progress"),
                    DropdownMenuEntry(value: 1, label: "Fixed"),
                  ],
                  onSelected: (value) async {
                    await DatabaseAPI.instance.uploadJson(
                        (widget.report..status = value ?? 0).toJson(),
                        "reports",
                        widget.report.generateDocumentId());
                  },
                  initialSelection: widget.report.status,
                ),
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            widget.dashboardCallback();
            Navigator.of(context).pop();
          },
          child: const Text("Close"),
        ),
        IconButton(
            onPressed: () {
              showDialog(
                  context: context,
                  builder: (context) {
                    return AlertDialog(
                      content: const SizedBox(
                        width: 100,
                        height: 100,
                        child: Text(
                            "Are you sure you want to delete this report forever? This action is not reversable!"),
                      ),
                      actions: [
                        TextButton(
                            onPressed: () async {
                              await DatabaseAPI.instance.deleteDocument(
                                  "reports",
                                  widget.report.generateDocumentId());

                              widget.dashboardCallback();
                              Navigator.of(context).pop();
                              Navigator.of(this.context).pop();
                            },
                            child: const Text("Yes")),
                        TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text("No")),
                      ],
                    );
                  });
            },
            icon: const Icon(Icons.delete_forever_outlined))
      ],
    );
  }
}
