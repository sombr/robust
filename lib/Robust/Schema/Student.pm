package Robust::Schema::Student;
use Moo;
with "Robust::Schema";

use Types::Standard qw/:all/;

sub init {
    my ($class, $dbh) = @_;

    $dbh->do(q{
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY ASC,
            name TEXT UNIQUE NOT NULL,
            sex  TEXT NOT NULL,
            is_with TEXT
        )
    });
}

sub populate {
    my $self = shift;
    my $data = require "data/student.data";

    my $req = $self->db->prepare("INSERT INTO students (name, sex, is_with) VALUES (?,?,?)");
    $req->execute( @$_{qw/name sex is_with/} ) for ( @$data );
}

sub all {
    my $self = shift;
    my $data = $self->db->selectall_hashref("SELECT * FROM students", "id");

    map { $self->new(%$_) } values %$data
}

#----------------------------------------------------------------------------------------

has id => (
    is => "ro",
    isa => Int,
    required => 1,
);

has name => (
    is => "ro",
    isa => Str,
    required => 1,
);

has sex => (
    is => "ro",
    isa => Enum[qw/F M/],
    required => 1,
);

has is_with => (
    is => "ro",
    isa => Str,
    coerce => sub { @_ && $_[0] || "" },
    default => "",
);

1;
