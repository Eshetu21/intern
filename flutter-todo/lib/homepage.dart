import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:todo_flutter/todo_controller.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  final TodoController _todoController = Get.put(TodoController());
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _todoController.getTodos();
  }

  void _showTodoDialog({int? id, String? title, String? description}) {
    _titleController.text = title ?? '';
    _descriptionController.text = description ?? '';

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(id == null ? 'Add Todo' : 'Update Todo'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _titleController,
                decoration: InputDecoration(labelText: 'Title'),
              ),
              TextField(
                controller: _descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                if (id == null) {
                  _todoController.addTodos(
                    title: _titleController.text,
                    description: _descriptionController.text,
                  );
                } else {
                  _todoController.updateTodos(
                    id: id,
                    title: _titleController.text,
                    description: _descriptionController.text,
                  );
                }
                Navigator.pop(context);
              },
              child: Text(id == null ? 'Add' : 'Update'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Todo List')),
      body: Obx(() {
        return ListView.builder(
          itemCount: _todoController.allTodos.length,
          itemBuilder: (context, index) {
            final todo = _todoController.allTodos[index];
            return ListTile(
              title: Text(todo['todo_title']),
              subtitle: Text(todo['todo_description']),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: Icon(Icons.edit),
                    onPressed: () {
                      _showTodoDialog(
                        id: todo['id'],
                        title: todo['todo_title'],
                        description: todo['todo_description'],
                      );
                    },
                  ),
                  IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () {
                      _todoController.deleteTodos(todo['id']);
                    },
                  ),
                ],
              ),
            );
          },
        );
      }),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showTodoDialog(),
        child: Icon(Icons.add),
      ),
    );
  }
}
