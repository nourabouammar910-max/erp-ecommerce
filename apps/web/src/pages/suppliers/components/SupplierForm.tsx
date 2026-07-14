import { useState } from "react";

interface Props {

  initial?: any;

  onSubmit: (data: any) => void;

}

export default function SupplierForm({

  initial,

  onSubmit,

}: Props) {

  const [name, setName] = useState(
    initial?.name || ""
  );

  const [phone, setPhone] = useState(
    initial?.phone || ""
  );

  const [email, setEmail] = useState(
    initial?.email || ""
  );

  function submit(e: any) {

    e.preventDefault();

    onSubmit({

      name,

      phone,

      email,

    });

  }

  return (

    <form onSubmit={submit}>

      <input
        placeholder="Supplier Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <button>

        Save

      </button>

    </form>

  );

}