public class ExpenseDto
{
    public int ExpenseId { get; set; }
    public string ExpenseNumber { get; set; }
    [property: JsonConverter(typeof(JsonStringEnumConverter))]
    public ExpenseCategory Category { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    [property: JsonConverter(typeof(JsonStringEnumConverter))]
    public BankPaymentMethod PaymentMethod { get; set; }
    public string Account { get; set; }
    public string Description { get; set; }
    public OperationType OperationType { get; set; }
}