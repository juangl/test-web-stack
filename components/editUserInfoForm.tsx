import { useForm } from "react-hook-form";
import styles from "../styles/editUserInfoForm.module.css";
import { UserPayload } from "./userList";

interface EditUserInfoFormProps {
  initialData: UserPayload;
  onCancel: () => void;
  onSubmit(values: UserPayload): void;
}
export default function EditUserInfoForm(props: EditUserInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.initialData,
  });
  
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="form-group">
        <label htmlFor="edit-user-name">Name</label>
        <input
          type="text"
          name="name"
          id="edit-user-name"
          {...register("name", { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="edit-address-address">Address</label>
        <input
          type="text"
          name="edit-address-address"
          {...register("address", { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="edit-user-description">Description</label>
        <input
          type="text"
          name="edit-user-description"
          {...register("description", { required: true })}
        />
      </div>
      <div className={styles.editUserFormFooter}>
        <button className="primary" type="submit">
          Save
        </button>
        <button className="secondary" type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
