// Flutter imports:
import 'package:flutter/material.dart';

// Project imports:
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';

class DashboardDeleteUserDialog extends StatefulWidget {
  const DashboardDeleteUserDialog({super.key});

  @override
  State<DashboardDeleteUserDialog> createState() =>
      _DashboardDeleteUserDialogState();
}

class _DashboardDeleteUserDialogState extends State<DashboardDeleteUserDialog> {
  List<Map<String, dynamic>> _users = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  Future<void> _fetchUsers() async {
    try {
      // Fetch users from Firebase
      var userDocuments = await DatabaseAPI.instance.getAllDocuments("users");

      setState(() {
        _users = userDocuments;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error occurred while fetching users'),
        ),
      );
    }
  }

  Future<void> _deleteUser(String username) async {
    try {
      // Delete the user from Firebase
      await DatabaseAPI.instance.deleteDocument("users", username);

      // Update the UI after deleting the user
      setState(() {
        _users.removeWhere((user) => user['name'] == username);
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('User deleted successfully'),
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error occurred while deleting user'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text("Delete User"),
      content: SizedBox(
        width: 400,
        height: 300,
        child: _isLoading
            ? const Center(child: CircularProgressIndicator())
            : _users.isEmpty
            ? const Center(child: Text("No users found"))
            : ListView.builder(
          itemCount: _users.length,
          itemBuilder: (context, index) {
            String username = _users[index]['name'];
            return ListTile(
              title: Text(username),
              trailing: IconButton(
                icon: const Icon(Icons.remove, color: Colors.red),
                onPressed: () async {
                  // Confirm deletion
                  bool? confirm = await showDialog<bool>(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text("Confirm Delete"),
                        content: Text(
                            "Are you sure you want to delete $username?"),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop(false);
                            },
                            child: const Text("Cancel"),
                          ),
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop(true);
                            },
                            child: const Text("Delete"),
                          ),
                        ],
                      );
                    },
                  );

                  if (confirm == true) {
                    _deleteUser(username);
                  }
                },
              ),
            );
          },
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text("Close"),
        ),
      ],
    );
  }
}
