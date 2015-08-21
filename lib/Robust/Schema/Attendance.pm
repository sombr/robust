package Robust::Schema::Attendance;
use Moo;
with "Robust::Schema";

use Robust::Schema::Student;
use Robust::Schema::Group;

sub init {
    my ($class, $dbh) = @_;

    # init dependance
    Robust::Schema::Student->db;
    Robust::Schema::Group->db;

    $dbh->do(q{
        CREATE TABLE IF NOT EXISTS attendances (
            id INTEGER PRIMARY KEY ASC,
            type TEXT NOT NULL,
            cost INTEGER NOT NULL,

            student_id INTEGER NOT NULL,
            group_id   INTEGER NOT NULL,

            date INTEGER NOT NULL,

            payment INTEGER NOT NULL,

            CONSTRAINT u_student_group_date
                UNIQUE ( student_id, group_id, date ),

            FOREIGN KEY (student_id) REFERENCES students(id),
            FOREIGN KEY (group_id) REFERENCES groups(id)
        )
    });
}

sub populate {
}

1;
