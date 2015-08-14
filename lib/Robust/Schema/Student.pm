package Robust::Schema::Student;
use Moo;

with "Robust::Schema";

sub init {
    my ($class, $dbh) = @_;

    $dbh->do(q{
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY ASC,
            name TEXT UNIQUE NOT NULL,
            sex  TEXT NOT NULL,
            with TEXT
        )
    });
}

sub populate {
    my $self = shift;
    my $data = require "data/student.data";

    my $req = $self->db->prepare("INSERT INTO students (name, sex, with) VALUES (?,?,?)");
    $req->execute( @$_{qw/name sex with/} ) for ( @$data );
}

1;
