package Robust::Schema;
use Moo::Role;

use DBI;
use DBD::SQLite;

use Scalar::Util qw/blessed/;

my $dbh;
my $init = {};
sub db {
    my $self = shift;
    $dbh //= DBI->connect("dbi:SQLite:dbname=data/data.sqlite","","");

    my $class = blessed $self || $self;
    $init->{$class} ||= $class->init($dbh);

    $dbh;
}

requires "init";

1;
