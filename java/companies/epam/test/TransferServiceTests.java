package companies.epam.test;

public class TransactionServiceTest {

  public void transfer() {
    // given
    var service = new TransactionService();
    var from = new Account("from", 1000);
    var to = new Account("to", 1000);

    // when
    service.transfer(from, to, 100);

    // then
    assertEquals(900, from.getBalance());
    assertEquals(1100, to.getBalance());
  }
}
