package Robust::Schema::Attendance;
use Moo;
with "Robust::Schema";

use Robust::Schema::Student;
use Robust::Schema::Group;

use Date::Parse qw/str2time/;

sub table { "attendances" }

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
    my $self = shift;
    return if $self->count;

    Robust::Schema::Group->populate;
    Robust::Schema::Student->populate;

    my $data = require "data/attendance.data";
    my $students = Robust::Schema::Student->by("name");
    my $groups = Robust::Schema::Group->by("name");

    for my $att ( @$data ) {
        my $student = $students->{ $att->{student} } or die "No such student $att->{student}";
        my $group   = $groups->{ $att->{group} } or die "No such group $att->{group}";

        $att->{student_id} = $student->id;
        $att->{group_id} = $group->id;

        $att->{date} = str2time( $att->{date} ) unless $att->{date} =~ /^\d{10}$/;
    }

    my $table = $self->table;
    my @fields = qw/type cost student_id group_id date payment/;
    my $req = $self->db->prepare("INSERT INTO $table (". join(",", @fields) .") VALUES (". join(",", ("?")x@fields) .")");
    $req->execute( @$_{@fields} ) for ( @$data );
}

1;
