package Robust::Schema::Attendance;
use Moo;

with "Robust::Schema";

sub init {
    my ($class, $dbh) = @_;

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
                UNIQUE ( student_id, group_id, date )
        )
    });
}

sub populate {
}

1;
