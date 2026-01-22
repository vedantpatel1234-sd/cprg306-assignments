import Link from "next/link";

export default function StudentInfo() {
  return (
    <section>
      <p>Your Name: Vedant Patel</p>
      <p>
        GitHub Repository:{" "}
        <Link href="https://github.com/vedantpatel1234-sd/cprg306-assignments">
          My Github Repo
        </Link>
      </p>
    </section>
  );
}
