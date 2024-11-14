import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class TodoController extends GetxController {
  RxList<Map<String, dynamic>> allTodos = <Map<String, dynamic>>[].obs;

  Future<void> getTodos() async {
    final response = await http
        .get(Uri.parse("http://192.168.23.180:80/api/fetch"), headers: {
      "Accept": "application/json",
    });
    if (response.statusCode == 200) {
      List<dynamic> todosData = json.decode(response.body)["todos"];
      allTodos.value =
          todosData.map((todo) => Map<String, dynamic>.from(todo)).toList();
    } else {
      print("Failed to fetch todos: ${response.statusCode}");
    }
  }

  Future<void> addTodos(
      {required String title, required String description}) async {
    var data = {"todo_title": title, "todo_description": description};
    final response =
        await http.post(Uri.parse("http://192.168.23.180:80/api/add"),
            headers: {
              "Accept": "application/json",
            },
            body: data);
    if (response.statusCode == 201) {
      getTodos();
    } else {
      print("Failed to add todo: ${response.statusCode}");
    }
  }

  Future<void> updateTodos(
      {required int id,
      required String title,
      required String description}) async {
    var data = {"todo_title": title, "todo_description": description};
    final response =
        await http.put(Uri.parse("http://192.168.23.180:80/api/update/$id"),
            headers: {
              "Accept": "application/json",
            },
            body: data);
    if (response.statusCode == 200) {
      getTodos();
    } else {
      print("Failed to update todo: ${response.statusCode}");
    }
  }

  Future<void> deleteTodos(int id) async {
    final response = await http
        .delete(Uri.parse("http://192.168.23.180:80/api/delete/$id"), headers: {
      "Accept": "application/json",
    });
    if (response.statusCode == 200) {
      getTodos();
    } else {
      print("Failed to delete todo: ${response.statusCode}");
    }
  }
}
