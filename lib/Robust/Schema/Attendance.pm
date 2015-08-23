package Robust::Schema::Attendance;
use Moo;
with "Robust::Schema";

use Robust::Schema::Student;
use Robust::Schema::Group;

use Date::Parse qw/str2time/;
use Types::Standard qw/:all/;

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
            skip BOOLEAN NOT NULL,
            cost INTEGER NOT NULL,

            student_id INTEGER NOT NULL,
            group_id   INTEGER NOT NULL,

            date INTEGER NOT NULL,

            payment INTEGER NOT NULL,

            CHECK ( cost >= 0 ),
            CHECK ( date >= 0 ),

            CONSTRAINT u_student_group_date
                UNIQUE ( student_id, group_id, date ),

            FOREIGN KEY (student_id) REFERENCES students(id),
            FOREIGN KEY (group_id) REFERENCES groups(id)
        )
    });

    $dbh->do(q{
        CREATE VIEW  IF NOT EXISTS
        attendance_info AS
        SELECT
            attendances.id,
            type,
            skip,
            cost,
            student_id,
            group_id,
            date,
            payment,
            students.name as student,
            groups.name as "group"
        FROM attendances JOIN students ON students.id = student_id
                         JOIN groups ON groups.id = group_id

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
    my @fields = qw/type cost student_id group_id date payment skip/;
    my $req = $self->db->prepare("INSERT INTO $table (". join(",", @fields) .") VALUES (". join(",", ("?")x@fields) .")");
    $req->execute( @$_{@fields} ) for ( @$data );
}

around by => sub {
    my ($orig, $self, $field) = @_;

    $self->$orig($field, q{
        SELECT * FROM attendance_info
    });
};

has id => (
    is => "ro",
    isa => Int,
    required => 1,
);

has type => (
    is => "ro",
    isa => Enum[qw/S/, map { "A-$_" } (1..8)],
    required => 1,
);

has skip => (
    is => "ro",
    isa => Bool,
    required => 1,
);

has cost => (
    is => "lazy",
    isa => Int,
    default => sub {
        my $self = shift;
        unless ( $self->skip ) {
            return 300 if ($self->type eq "S");
            return 2000 if ($self->type eq "A-1");
        }
        return 0;
    }
);

has student_id => (
    is => "ro",
    isa => Int,
    required => 1,
);

has student => (
    is => "lazy",
    isa => Str,
);

has group_id => (
    is => "ro",
    isa => Int,
    required => 1,
);

has group => (
    is => "lazy",
    isa => Str,
);

has date => (
    is => "ro",
    isa => Int,
    required => 1,
);

has payment => (
    is => "ro",
    isa => Int,
    required => 1,
);

1;
