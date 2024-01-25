<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Validator;
class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::all();
        return view('todo',compact('todos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'message' => 'required'
        ]);

        if ($validator->fails()){
            return redirect()->route('todos.index')->withErrors($validator);
        }

        Todo::create([
            'title'=>$request->get('title'),
            'message'=>$request->get('message')
        ]);

        return redirect()->route('todos.index')->with('success', 'Inserted');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return view('todolist', compact('todo'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $todo=Todo::where('id',$id)->first();
        return view('editTodo',compact('todo'));
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if ($validator->fails())
        {
            return redirect()->route('todos.edit',['todo'=>$id])->withErrors($validator);
        }



        $todo=Todo::where('id',$id)->first();
        $todo->title=$request->get('title');
        $todo->message=$request->get('message');
        $todo->isCompleted=$request->get('isCompleted');
        $todo->save();

        return redirect()->route('todos.index')->with('success', 'Updated!!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    $todo = Todo::find($id);
    if (!$todo){
        return redirect()->route('todos.index',['todo'=>$id])->withErrors($todo);
    }
    $todo->delete();

    return redirect()->route('todos.index') ->with('success', 'Deleted');
    }
}
