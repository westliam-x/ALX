<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Update Task</title>
</head>
<body>
<div class="text-center mt-5">
    <h2>Update Task</h2>
</div>

<form  method="POST" action="{{route('todos.update',['todo'=>$todo->id])}}">

    @csrf

    {{ method_field('PUT') }}

    <div class="row justify-content-center mt-5">

        <div class="col-lg-6">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" name="title" placeholder="Title" value="{{$todo->title}}">
            </div>
            <div class="mb-3">
                <label class="form-label">Message</label>
                <input type="text" class="form-control" name="message" placeholder="Message" value="{{$todo->message}}">
            </div>
            <div class="mb-3">
                <label class="form-label">Status</label>
                <select name="isCompleted" id="" class="form-control">
                    <option value="1" @if($todo->isCompleted==1) selected @endif>Complete</option>
                    <option value="0" @if($todo->isCompleted==0) selected @endif>Not Complete</option>
                </select>
            </div>

            <div class="mb-3">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
    </div>

</form>
<div class="row justify-content-center mt-5">
    <div class="col-lg-6">
        @if(session()->has('success'))
            <div class="alert alert-success">
                {{ session()->get('success') }}
            </div>
        @endif

        @if ($errors->any())
            @foreach ($errors->all() as $error)
                <div class="alert alert-danger">
                    {{$error}}
                </div>
            @endforeach
        @endif
    </div>
</div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>
</html>