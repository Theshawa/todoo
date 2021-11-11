import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { v4 } from "uuid";
import axios from "axios";
const url = 'https://todoo-feeds.herokuapp.com'

const EmailSend = ({ title, description, close, time }) => {
  const [loading, setLoading] = useState(false);
  const name = useRef();
  const email = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      service_id: "gmail",
      template_id: "template_i7ftmtj",
      user_id: "user_OMiIvCfHCJvMdWqM1LLyg",
      template_params: {
        from_name: name.current.value,
        title: title,
        description: description,
        time: time,
        to_email: email.current.value,
      },
    };
    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data)
      .then(() => {
        setLoading(false);
        alert(`Todo Sent to ${email.current.value}.`);
        close();
      })
      .catch((err) => {
        setLoading(false);
        alert("Unable to send email due to an error. Please try again later.");
      });
  };
  return title && description ? (
    <div className="flex flex-col gap-8 z-50 fixed left-0 p-8 w-screen h-screen bg-dark top-0 bg-opacity-50 items-center justify-center">
      <div className="p-8 w-full rounded-xl bg-white max-w-xl shadow-xl flex flex-col gap-8">
        <span className="font-bold text-xl">Send This Todo As an Email</span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            ref={name}
            type="text"
            placeholder="Your Name"
            className="bg-opacity-10 focus:bg-opacity-20"
          />
          <input
            required
            ref={email}
            type="email"
            placeholder="Email"
            className="bg-opacity-10 focus:bg-opacity-20"
          />
          {loading ? (
            <p className="opacity-60">Sending...</p>
          ) : (
            <div className="flex gap-4">
              <button>Send Todo</button>
              <div onClick={close} className="button">
                Cancel
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

const Todo = ({ data, deleteTodo, makeDone }) => {
  const [done, setDone] = useState((data && data.done) || false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (data) {
      makeDone(data.id, done);
    }
  }, [done]);
  return data ? (
    <div
      className={`${
        done ? "line-through" : ""
      } w-full flex flex-col max-w-lg gap-6 rounded-lg bg-dark bg-opacity-5 p-4`}
    >
      {showEmail && (
        <EmailSend
          description={data.description}
          title={data.title}
          close={() => setShowEmail(false)}
          time={moment.unix(data.time).fromNow()}
        />
      )}
      <div className="w-full justify-between text-end flex">
        <span className="opacity-50">{moment.unix(data.time).fromNow()}</span>
        <div className="flex gap-4">
          <div
            className={`p-2  rounded-lg bg-primary   transition-opacity duration-200 ease-in-out pointer-events-none ${
              done ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src="/images/done.svg" alt="" className="w-6 h-6" />
          </div>

          <div
            onClick={() => {
              setShowEmail(!showEmail);
            }}
            role="button"
            className="p-2  rounded-lg bg-dark bg-opacity-5 hover:bg-opacity-10 transition"
          >
            <img src="/images/email.svg" alt="" className="w-6 h-6" />
          </div>

          <div
            onClick={() => deleteTodo(data.id)}
            role="button"
            className="p-2  rounded-lg bg-dark bg-opacity-5 hover:bg-opacity-10 transition"
          >
            <img src="/images/trash.svg" alt="" className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          onClick={() => setDone(!done)}
          className="text-xl font-bold hover:underline"
          role="button"
        >
          {data.title}{" "}
        </div>
        <div className="">{data.description}</div>
      </div>
      <div className="w-full justify-end text-end flex"></div>
    </div>
  ) : (
    ""
  );
};

const Todos = ({ todos, deleteTodo, makeDone }) => {
  return todos ? (
    <div className="w-full flex flex-col gap-4 items-end h-full overflow-auto px-4">
      {todos.map((todo) => (
        <Todo
          data={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          makeDone={makeDone}
        />
      ))}
      {!todos.length && (
        <p className="px-4 opacity-40 text-xl text-dark">No todos yet.</p>
      )}
    </div>
  ) : (
    ""
  );
};

export default function Home({siteData}) {
  const [todos, setTodos] = useState([]);
  const [doneCount, setDoneCount] = useState(0);
  const title = useRef();
  const description = useRef();
  const makeTodoCount = () => {
    const doneTodos = todos.filter((todo) => todo.done);
    setDoneCount(doneTodos.length);
  };
  const addTodos = (todos) => {
    if (localStorage) {
      localStorage.setItem("ToDOO_todos", JSON.stringify(todos));
    }
  };
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    addTodos(newTodos);
    makeTodoCount();
    setTodos(newTodos);
  };
  const makeDone = (id, status) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].done = status;
    addTodos(todos);
    makeTodoCount();
    setTodos(todos);
  };

  useEffect(() => {
    if (localStorage) {
      const todosHash = localStorage.getItem("ToDOO_todos");
      if (todosHash) {
        setTodos(JSON.parse(todosHash));
      } else {
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    makeTodoCount();
    console.log(todos);
  }, [todos]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      description: description.current.value,
      time: moment().unix(),
      id: v4(),
      done: false,
    };
    addTodos([data, ...todos]);
    setTodos([data, ...todos]);
  };
  return (
    <Layout
    data={{
      title:'ToDOO | Add Todos',
      description:siteData.site_description || '',
      keywords:siteData.site_tags || '',
      author:siteData.site_author || '',
      icon:url + siteData.favicon.url
    }}
      className="flex flex-col md:flex-row gap-8 md:h-5/6 flex-shrink-0"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-8 max-w-xl"
      >
        <span className="opacity-60 mb-8">/todo</span>
        <h1 className="my-6">Let's Add Todos</h1>
        <input required ref={title} type="text" placeholder="Title"></input>
        <textarea
          required
          ref={description}
          type="text"
          placeholder="Description"
        />

        <button>Add New Todo</button>
        {todos && todos.length ? (
          <span
            className="text-xl text-primary text-opacity-60 mt-8"
            key={doneCount}
          >
            {doneCount || "None"} of {todos.length} todo
            {todos.length === 1 ? "" : "s"} done.
          </span>
        ) : (
          ""
        )}
      </form>
      <Todos todos={todos} deleteTodo={deleteTodo} makeDone={makeDone} />
    </Layout>
  );
}
export async function getServerSideProps(context) {
  
  const siteData = await axios.get(url+'/site')

  if (!siteData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return {
    props: { siteData:siteData.data}, // will be passed to the page component as props
  }
}