<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => ['required', 'min:3', 'max:255'],
        ]);

        /**
         * @var \App\Models\User
         */
        $user = Auth::user();

        $user->todos()->create([
            'content' => $request->input('content'),
        ]);

        return back()->with('toast', [
            'severity' => 'success',
            'summary' => 'Todo created successfully!',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'content' => ['required', 'min:3', 'max:255'],
        ]);

        $todo->update([
            'content' => $request->input('content'),
        ]);

        return back()->with('toast', [
            'severity' => 'success',
            'summary' => 'Todo updated successfully!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return back()->with('toast', [
            'severity' => 'success',
            'summary' => 'Todo deleted successfully!',
        ]);
    }
}
